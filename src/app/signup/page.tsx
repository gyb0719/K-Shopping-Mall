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
  User,
  Phone,
  Check
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuthStore()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToMarketing, setAgreedToMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const passwordRequirements = [
    { text: '최소 8자 이상', met: formData.password.length >= 8 },
    { text: '대문자 포함', met: /[A-Z]/.test(formData.password) },
    { text: '소문자 포함', met: /[a-z]/.test(formData.password) },
    { text: '숫자 포함', met: /\d/.test(formData.password) },
    { text: '특수문자 포함', met: /[!@#$%^&*]/.test(formData.password) }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('필수 항목을 모두 입력해주세요')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다')
      return
    }

    if (!passwordRequirements.every(req => req.met)) {
      toast.error('비밀번호 요구사항을 모두 충족해주세요')
      return
    }

    if (!agreedToTerms) {
      toast.error('이용약관에 동의해주세요')
      return
    }

    setIsLoading(true)
    
    try {
      // 테스트용 회원가입 (실제로는 Supabase 연동)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('회원가입이 완료되었습니다!')
      router.push('/login')
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
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

        {/* Sign Up Form */}
        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                이름 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                휴대폰 번호
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                비밀번호 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
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
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-xs ${
                        req.met ? 'text-green-600' : 'text-muted-foreground'
                      }`}
                    >
                      <Check className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                      <span>{req.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                비밀번호 확인 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive mt-1">
                  비밀번호가 일치하지 않습니다
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span className="text-sm">
                  <span className="text-destructive">*</span> 
                  {' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    이용약관
                  </Link>
                  {' '}및{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </span>
              </label>
              
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToMarketing}
                  onChange={(e) => setAgreedToMarketing(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span className="text-sm">
                  마케팅 정보 수신에 동의합니다 (선택)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin mode="signup" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}