import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Development/Demo mode - Create a mock client if environment variables are not set
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Only create Supabase client if valid credentials are provided
export const supabase = isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key'
  ? createClient(supabaseUrl!, supabaseAnonKey)
  : null

// Mock Supabase client for development/demo purposes
export const isSupabaseConfigured = supabase !== null

// Development warning
if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn('⚠️ Supabase is not configured. Running in demo mode.')
}