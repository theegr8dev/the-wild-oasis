import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qokvvpgtqsaxpepnbges.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva3Z2cGd0cXNheHBlcG5iZ2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNzE1MjQsImV4cCI6MjAxMjg0NzUyNH0.n4Sm6PvKEncg1u_mqSAhYdS_DTVtZKtrsDX6qLCCCxY';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
