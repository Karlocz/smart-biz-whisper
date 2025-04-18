
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

export function validateConfig() {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured. Please add the OPENAI_API_KEY to your Supabase Edge Function secrets');
  }
}

export function initSupabase() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
