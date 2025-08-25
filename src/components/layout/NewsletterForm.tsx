'use client'

import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('이메일 주소를 입력해주세요')
      return
    }

    setIsSubmitting(true)
    
    try {
      // 뉴스레터 구독 처리 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('뉴스레터 구독이 완료되었습니다!')
      setEmail('')
    } catch (error) {
      toast.error('구독 신청 중 오류가 발생했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex gap-2 w-full md:w-auto">
        <div className="flex-1 md:w-64 h-10 px-4 rounded-md border border-input bg-background" />
        <div className="h-10 px-6 rounded-md bg-primary text-primary-foreground flex items-center">
          구독
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소"
        className="flex-1 md:w-64 h-10 px-4 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        disabled={isSubmitting}
        autoComplete="off"
        data-form-type="other"
      />
      <button
        type="submit"
        className="h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? '처리중...' : '구독'}
      </button>
    </form>
  )
}