import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvhptjmouxznfmjgmhbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aHB0am1vdXh6bmZtamdtaGJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ3NzAzMywiZXhwIjoyMDkwMDUzMDMzfQ.P_U5GuYCH1d0qPGMLrOomtEbY_BHiw1RPglc38Y7uMQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('company_applications').select('company_handle, gstin');
  console.log('Data:', data);
  if (error) console.error('Error:', error);
}

run();
