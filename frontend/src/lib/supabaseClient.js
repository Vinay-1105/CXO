import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const token = localStorage.getItem("token");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
