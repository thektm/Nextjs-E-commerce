import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ziirkfihxenixzqmwgwb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaXJrZmloeGVuaXh6cW13Z3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg0MTQsImV4cCI6MjA1NzY2NDQxNH0.5wAsSWMWXQxmDtFs6dfxLzdOW8RVUxV9qBPoNNXuRBw"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);