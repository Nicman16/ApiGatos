// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujdojmvkukskvcfzocjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZG9qbXZrdWtza3ZjZnpvY2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTU5NjYsImV4cCI6MjA2MzUzMTk2Nn0.hDna0-36PMgO52EpSjyCU-f4ML7-T2ZN40etZiTrlew';
export const supabase = createClient(supabaseUrl, supabaseKey);
