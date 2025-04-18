
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { analyzeWithOpenAI } from "./openai.ts";
import { validateConfig, initSupabase } from "./config.ts";

export async function handleSpreadsheetAnalysis(spreadsheetId: string) {
  const supabase = initSupabase();

  // Get spreadsheet details
  const { data: spreadsheet, error: fetchError } = await supabase
    .from('spreadsheet_analysis')
    .select('*')
    .eq('id', spreadsheetId)
    .single();

  if (fetchError || !spreadsheet) {
    throw new Error(`Error fetching spreadsheet: ${fetchError?.message || 'Not found'}`);
  }

  // Check if already processed
  if (spreadsheet.status === 'completed') {
    console.log(`Spreadsheet ${spreadsheetId} already processed. Skipping analysis.`);
    return { success: true, message: 'Analysis already completed' };
  }

  await updateSpreadsheetStatus(supabase, spreadsheetId, 'processing');
  
  // Download and process file
  const fileContent = await downloadSpreadsheetContent(supabase, spreadsheet.original_file_path);
  const fileLines = fileContent.split('\n').slice(0, 20).join('\n');

  try {
    const analysisResults = await analyzeWithOpenAI(fileLines);
    
    await supabase
      .from('spreadsheet_analysis')
      .update({
        status: 'completed',
        analysis_results: analysisResults
      })
      .eq('id', spreadsheetId);

    console.log(`Analysis completed successfully for spreadsheet ID: ${spreadsheetId}`);
    return { success: true, message: 'Analysis completed' };
  } catch (error) {
    console.error('Error during analysis:', error);
    await updateSpreadsheetStatus(supabase, spreadsheetId, 'failed');
    throw error;
  }
}

async function updateSpreadsheetStatus(supabase: any, spreadsheetId: string, status: 'processing' | 'failed') {
  const { error } = await supabase
    .from('spreadsheet_analysis')
    .update({ status })
    .eq('id', spreadsheetId);
    
  if (error) {
    console.error(`Error updating status to ${status}:`, error.message);
    throw new Error(`Failed to update status: ${error.message}`);
  }
  console.log(`Successfully updated status to ${status}`);
}

async function downloadSpreadsheetContent(supabase: any, filePath: string): Promise<string> {
  console.log(`Downloading file from storage bucket: spreadsheets, path: ${filePath}`);
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('spreadsheets')
    .download(filePath);

  if (downloadError || !fileData) {
    throw new Error(`Error downloading file: ${downloadError?.message || 'Not found'}`);
  }

  console.log(`Successfully downloaded file, reading content`);
  return fileData.text();
}
