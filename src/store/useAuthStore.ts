import { create } from 'zustand'
import { User } from '@/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface AuthStore {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false, // Changed to false for demo mode

  signIn: async (email, password) => {
    // Demo mode - no real authentication
    if (!isSupabaseConfigured) {
      // Demo users for testing
      if (email === 'test@example.com' && password === 'password') {
        set({
          user: {
            id: '1',
            email: email,
            name: '테스트 사용자',
            role: 'customer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        })
        return
      } else if (email === 'admin@example.com' && password === 'admin') {
        set({
          user: {
            id: '2',
            email: email,
            name: '관리자',
            role: 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        })
        return
      }
      throw new Error('Invalid credentials')
    }

    // Real Supabase authentication
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  },

  signUp: async (email, password, name) => {
    if (!isSupabaseConfigured) {
      // Demo mode - just set a user
      set({
        user: {
          id: Date.now().toString(),
          email: email,
          name: name || email.split('@')[0],
          role: 'customer',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      })
      return
    }

    // Real Supabase signup
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    if (error) throw error
  },

  signOut: async () => {
    if (isSupabaseConfigured) {
      await supabase!.auth.signOut()
    }
    set({ user: null })
  },

  setUser: (user) => set({ user }),

  checkAuth: async () => {
    if (!isSupabaseConfigured) {
      // Demo mode - no session to check
      set({ loading: false })
      return
    }

    set({ loading: true })
    try {
      const { data: { session } } = await supabase!.auth.getSession()
      if (session?.user) {
        set({ 
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            role: session.user.user_metadata?.role || 'customer',
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          }
        })
      } else {
        set({ user: null })
      }
    } finally {
      set({ loading: false })
    }
  }
}))