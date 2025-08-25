'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/Button'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Package,
  Github,
  Chrome
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요')
      return
    }

    setIsLoading(true)
    
    try {
      // 테스트용 로그인 (실제로는 Supabase 연동)
      if (email === 'test@example.com' && password === 'password') {
        // 임시 사용자 설정
        useAuthStore.getState().setUser({
          id: '1',
          email: email,
          name: '테스트 사용자',
          role: 'customer',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        toast.success('로그인 성공!')
        router.push('/')
      } else if (email === 'admin@example.com' && password === 'admin') {
        // 관리자 계정
        useAuthStore.getState().setUser({
          id: '2',
          email: email,
          name: '관리자',
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        toast.success('관리자 로그인 성공!')
        router.push('/admin')
      } else {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다')
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast('소셜 로그인은 준비 중입니다', { icon: '🚧' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Package className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">K-Shop</span>
        </Link>

        {/* Login Form */}
        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">로그인 상태 유지</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin mode="login" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>

          {/* Test Account Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <p className="text-xs text-muted-foreground mb-2">
              테스트 계정:
            </p>
            <p className="text-xs font-mono">
              일반: test@example.com / password
            </p>
            <p className="text-xs font-mono">
              관리자: admin@example.com / admin
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}