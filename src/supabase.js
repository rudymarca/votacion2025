import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zjxcvpkgocyvoyxqvrfm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeGN2cGtnb2N5dm95eHF2cmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjIyMDksImV4cCI6MjA2MDQ5ODIwOX0.NznTqthdB-7u3MoqiGk_g82_m1QEX8CMbR-kaO7biis"; // Copiar desde Supabase > API > anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
