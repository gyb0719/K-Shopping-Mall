'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface SocialLoginProps {
  mode: 'login' | 'signup'
}

export function SocialLogin({ mode }: SocialLoginProps) {
  const handleGoogleLogin = async () => {
    try {
      // Google OAuth 시뮬레이션
      toast.loading('Google 로그인 중...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.dismiss()
      toast.success('Google 로그인 성공!')
      
      // 실제 구현시에는 Google OAuth SDK 사용
      // window.location.href = '/api/auth/google'
    } catch (error) {
      toast.error('Google 로그인 실패')
    }
  }

  const handleKakaoLogin = async () => {
    try {
      // Kakao OAuth 시뮬레이션
      toast.loading('카카오 로그인 중...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.dismiss()
      toast.success('카카오 로그인 성공!')
      
      // 실제 구현시에는 Kakao SDK 사용
      // window.location.href = '/api/auth/kakao'
    } catch (error) {
      toast.error('카카오 로그인 실패')
    }
  }

  const handleNaverLogin = async () => {
    try {
      // Naver OAuth 시뮬레이션
      toast.loading('네이버 로그인 중...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.dismiss()
      toast.success('네이버 로그인 성공!')
      
      // 실제 구현시에는 Naver SDK 사용
      // window.location.href = '/api/auth/naver'
    } catch (error) {
      toast.error('네이버 로그인 실패')
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {mode === 'login' ? '간편 로그인' : '간편 가입'}
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full"
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Google로 {mode === 'login' ? '로그인' : '시작하기'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleKakaoLogin}
          className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-[#FEE500]"
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C6.477 3 2 6.935 2 11.82c0 3.16 1.872 5.93 4.682 7.49l-.96 3.49a.3.3 0 00.465.32l3.852-2.567c.63.095 1.285.147 1.961.147 5.523 0 10-3.935 10-8.82S17.523 3 12 3z"
              fill="currentColor"
            />
          </svg>
          카카오로 {mode === 'login' ? '로그인' : '시작하기'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleNaverLogin}
          className="w-full bg-[#03C75A] hover:bg-[#03C75A]/90 text-white border-[#03C75A]"
        >
          <span className="mr-2 font-bold text-lg">N</span>
          네이버로 {mode === 'login' ? '로그인' : '시작하기'}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        소셜 {mode === 'login' ? '로그인' : '계정'}으로 {mode === 'login' ? '로그인' : '가입'}하면 
        <br />
        <a href="/terms" className="underline">이용약관</a> 및{' '}
        <a href="/privacy" className="underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  )
}