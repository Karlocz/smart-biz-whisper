// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ycernrtupmbjkcbbybuv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZXJucnR1cG1iamtjYmJ5YnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NjQ4OTAsImV4cCI6MjA2MDM0MDg5MH0.xh2FISq0TH74cEwMBxwMUeqPVnoBQstf1xZNnMrBsN0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);