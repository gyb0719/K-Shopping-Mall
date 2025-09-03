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
  initializeAuth: () => void
}

// localStorage에서 user 정보 가져오기
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('auth-user')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

// localStorage에 user 정보 저장하기
const storeUser = (user: User | null) => {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem('auth-user', JSON.stringify(user))
  } else {
    localStorage.removeItem('auth-user')
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null, // 항상 null로 시작 (hydration 에러 방지)
  loading: false, // Changed to false for demo mode

  signIn: async (email, password) => {
    // Demo mode - no real authentication
    if (!isSupabaseConfigured) {
      // Demo users for testing
      if (email === 'test@example.com' && password === 'password') {
        const user = {
          id: '1',
          email: email,
          name: '테스트 사용자',
          role: 'customer' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        set({ user })
        storeUser(user) // localStorage에 저장
        return
      } else if (email === 'admin@example.com' && password === 'admin') {
        const user = {
          id: '2',
          email: email,
          name: '관리자',
          role: 'admin' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        set({ user })
        storeUser(user) // localStorage에 저장
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
      const user = {
        id: Date.now().toString(),
        email: email,
        name: name || email.split('@')[0],
        role: 'customer' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      set({ user })
      storeUser(user) // localStorage에 저장
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
    storeUser(null) // localStorage에서 제거
  },

  setUser: (user) => {
    set({ user })
    storeUser(user) // localStorage에 저장
  },

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
        const user = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name,
          role: session.user.user_metadata?.role || 'customer',
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        }
        set({ user })
        storeUser(user) // localStorage에 저장
      } else {
        set({ user: null })
        storeUser(null) // localStorage에서 제거
      }
    } finally {
      set({ loading: false })
    }
  },

  initializeAuth: () => {
    // 클라이언트에서만 실행
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser) {
        set({ user: storedUser })
      }
    }
  }
}))