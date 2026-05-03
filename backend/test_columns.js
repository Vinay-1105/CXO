import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvhptjmouxznfmjgmhbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub24iLCJpYXQiOjE3NzQ0NzcwMzMsImV4cCI6MjA5MDA1MzAzM30.I0StlJTkxjkRQuN0BI0uziGPWlNnHdp7VX2p0B2Mowc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('expert_applications').select('*').limit(1);
  if (data && data.length > 0) {
      console.log(Object.keys(data[0]));
  } else {
      console.log("No rows, fetching schema...");
      // or try to insert a fake row that fails to see column error, or try postgrest openapi if enabled
      const r = await fetch(supabaseUrl + '/rest/v1/expert_applications?limit=1', {
          headers: { apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey }
      });
      console.log(await r.json());
  }
}
run();
