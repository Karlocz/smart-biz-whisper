
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the Auth context
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') ?? '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let spreadsheetId = null;
  let supabase = null;

  try {
    // Validate OpenAI API key first
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured',
          message: 'Please add the OPENAI_API_KEY to your Supabase Edge Function secrets'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const requestBody = await req.json();
    spreadsheetId = requestBody.spreadsheetId;
    console.log(`Starting analysis for spreadsheet ID: ${spreadsheetId}`);

    if (!spreadsheetId) {
      throw new Error('Missing spreadsheet ID');
    }

    // Initialize Supabase client
    supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get spreadsheet details
    const { data: spreadsheet, error: fetchError } = await supabase
      .from('spreadsheet_analysis')
      .select('*')
      .eq('id', spreadsheetId)
      .single();

    if (fetchError || !spreadsheet) {
      throw new Error(`Error fetching spreadsheet: ${fetchError?.message || 'Not found'}`);
    }

    // Check if the spreadsheet is already being processed or completed
    if (spreadsheet.status === 'completed') {
      console.log(`Spreadsheet ${spreadsheetId} already processed. Skipping analysis.`);
      return new Response(
        JSON.stringify({ success: true, message: 'Analysis already completed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Updating status to processing for spreadsheet ID: ${spreadsheetId}`);
    
    // Update status to processing
    const { error: updateError } = await supabase
      .from('spreadsheet_analysis')
      .update({ status: 'processing' })
      .eq('id', spreadsheetId);
      
    if (updateError) {
      console.error(`Error updating status to processing: ${updateError.message}`);
      throw new Error(`Failed to update status: ${updateError.message}`);
    }

    console.log(`Successfully updated status to processing`);

    // Download the file from storage
    console.log(`Downloading file from storage bucket: spreadsheets, path: ${spreadsheet.original_file_path}`);
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('spreadsheets')
      .download(spreadsheet.original_file_path);

    if (downloadError || !fileData) {
      throw new Error(`Error downloading file: ${downloadError?.message || 'Not found'}`);
    }

    console.log(`Successfully downloaded file, reading content`);
    const fileContent = await fileData.text();
    const fileLines = fileContent.split('\n').slice(0, 20).join('\n'); // Sample first 20 lines for analysis
    
    console.log(`Successfully read spreadsheet data, starting AI analysis`);

    // Analyze with OpenAI
    console.log(`Making OpenAI API request with API key`);
    
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a financial data analyst. Analyze the spreadsheet data provided and return a JSON response with the following structure:
              {
                "summary": "Brief summary of the spreadsheet content",
                "metrics": {
                  "metric1": "value1",
                  "metric2": "value2",
                  "metric3": "value3",
                  "metric4": "value4"
                },
                "insights": [
                  "Insight 1",
                  "Insight 2",
                  "Insight 3",
                  "Insight 4"
                ],
                "data": [
                  { "name": "Category 1", "value": 123 },
                  { "name": "Category 2", "value": 456 },
                  { "name": "Category 3", "value": 789 },
                  { "name": "Category 4", "value": 321 }
                ]
              }
              
              Pay careful attention to return valid JSON that exactly matches this structure.`
          },
          {
            role: 'user',
            content: `Analyze this spreadsheet data:\n${fileLines}`
          }
        ],
        temperature: 0.5,
      }),
    });

    // Check for API response errors
    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      console.error('OpenAI API error:', JSON.stringify(errorData));
      
      // Update status to failed
      await supabase
        .from('spreadsheet_analysis')
        .update({ status: 'failed' })
        .eq('id', spreadsheetId);
        
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const aiData = await aiResponse.json();
    console.log('OpenAI API response status:', aiResponse.status);
    console.log('OpenAI API response data received. Processing results...');
    
    const analysisText = aiData.choices?.[0]?.message?.content;
    
    if (!analysisText) {
      console.error('No analysis text received from OpenAI');
      await supabase
        .from('spreadsheet_analysis')
        .update({ status: 'failed' })
        .eq('id', spreadsheetId);
        
      throw new Error('Failed to get analysis from AI');
    }

    console.log(`Received AI analysis text, parsing as JSON`);

    // Parse the JSON result from the AI
    let analysisResults;
    try {
      // Clean up any markdown code block formatting if present
      const jsonText = analysisText.replace(/```json\n?|\n?```/g, '');
      analysisResults = JSON.parse(jsonText);
      console.log('Successfully parsed analysis results');
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('AI response raw text:', analysisText);
      
      // Update status to failed
      await supabase
        .from('spreadsheet_analysis')
        .update({ status: 'failed' })
        .eq('id', spreadsheetId);
        
      throw new Error('Failed to parse AI analysis results');
    }

    console.log(`Updating spreadsheet with analysis results and status=completed`);
    
    // Update the spreadsheet analysis with the results
    const { error: updateResultsError } = await supabase
      .from('spreadsheet_analysis')
      .update({
        status: 'completed',
        analysis_results: analysisResults
      })
      .eq('id', spreadsheetId);

    if (updateResultsError) {
      console.error(`Error updating analysis results: ${updateResultsError.message}`);
      throw new Error(`Error updating analysis results: ${updateResultsError.message}`);
    }

    console.log(`Analysis completed successfully for spreadsheet ID: ${spreadsheetId}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Analysis completed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in spreadsheet analysis:', error);
    
    // If we have a spreadsheet ID and supabase client, update its status to failed
    try {
      if (spreadsheetId && supabase) {
        console.log(`Updating status to failed for spreadsheet ID: ${spreadsheetId}`);
        await supabase
          .from('spreadsheet_analysis')
          .update({ status: 'failed' })
          .eq('id', spreadsheetId);
      }
    } catch (updateError) {
      console.error('Error updating spreadsheet status to failed:', updateError);
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
