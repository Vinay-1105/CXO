import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvhptjmouxznfmjgmhbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub24iLCJpYXQiOjE3NzQ0NzcwMzMsImV4cCI6MjA5MDA1MzAzM30.I0StlJTkxjkRQuN0BI0uziGPWlNnHdp7VX2p0B2Mowc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('expert_applications').select('email').limit(1);
  console.log('Anon Data Expert:', data);
  if (error) console.error('Error:', error);
}

run();
