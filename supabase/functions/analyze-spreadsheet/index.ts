
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

    const { spreadsheetId } = await req.json();
    console.log(`Starting analysis for spreadsheet ID: ${spreadsheetId}`);

    if (!spreadsheetId) {
      throw new Error('Missing spreadsheet ID');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get spreadsheet details
    const { data: spreadsheet, error: fetchError } = await supabase
      .from('spreadsheet_analysis')
      .select('*')
      .eq('id', spreadsheetId)
      .single();

    if (fetchError || !spreadsheet) {
      throw new Error(`Error fetching spreadsheet: ${fetchError?.message || 'Not found'}`);
    }

    // Update status to processing
    await supabase
      .from('spreadsheet_analysis')
      .update({ status: 'processing' })
      .eq('id', spreadsheetId);

    console.log(`Updated status to processing for spreadsheet ID: ${spreadsheetId}`);

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('spreadsheets')
      .download(spreadsheet.original_file_path);

    if (downloadError || !fileData) {
      throw new Error(`Error downloading file: ${downloadError?.message || 'Not found'}`);
    }

    const fileContent = await fileData.text();
    const fileLines = fileContent.split('\n').slice(0, 20).join('\n'); // Sample first 20 lines for analysis
    
    console.log(`Successfully read spreadsheet data, starting AI analysis`);

    // Analyze with OpenAI
    console.log(`Making OpenAI API request with API key length: ${openAIApiKey.length}`);
    
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
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const aiData = await aiResponse.json();
    console.log('OpenAI API response status:', aiResponse.status);
    console.log('OpenAI API response data length:', JSON.stringify(aiData).length);
    
    const analysisText = aiData.choices?.[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('Failed to get analysis from AI');
    }

    console.log(`Received AI analysis, parsing results`);

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
      throw new Error('Failed to parse AI analysis results');
    }

    // Update the spreadsheet analysis with the results
    const { error: updateError } = await supabase
      .from('spreadsheet_analysis')
      .update({
        status: 'completed',
        analysis_results: analysisResults
      })
      .eq('id', spreadsheetId);

    if (updateError) {
      throw new Error(`Error updating analysis results: ${updateError.message}`);
    }

    console.log(`Analysis completed successfully for spreadsheet ID: ${spreadsheetId}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Analysis completed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in spreadsheet analysis:', error);
    
    // If we have a spreadsheet ID, update its status to failed
    try {
      const { spreadsheetId } = await req.json();
      if (spreadsheetId) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase
          .from('spreadsheet_analysis')
          .update({ status: 'failed' })
          .eq('id', spreadsheetId);
      }
    } catch (updateError) {
      console.error('Error updating spreadsheet status:', updateError);
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
