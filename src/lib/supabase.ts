import { createClient } from '@supabase/supabase-js'

// Environment variables from Vite (Vue + Vite still uses import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript interface for todos
export interface Todo {
  id: number
  title: string
  completed: boolean
  created_at?: string
}
