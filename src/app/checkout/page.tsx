'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useCouponStore } from '@/store/useCouponStore'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import {
  Package,
  MapPin,
  CreditCard,
  Check,
  ChevronRight,
  User,
  Phone,
  Mail,
  Home,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

type Step = 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { 
    applyCoupon, 
    removeCoupon, 
    appliedCoupon,
    getCouponDiscount,
    applyPoints,
    removePoints,
    appliedPoints,
    userPoints,
    usePoints,
    earnPoints
  } = useCouponStore()
  
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [pointsToUse, setPointsToUse] = useState(0)
  
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    detailAddress: '',
    postalCode: '',
    memo: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card')
  const [agreeToPurchase, setAgreeToPurchase] = useState(false)

  const subtotal = getTotalPrice()
  const shippingFee = subtotal >= 50000 ? 0 : 3000
  const couponDiscount = getCouponDiscount(subtotal)
  const totalBeforePoints = subtotal + shippingFee - couponDiscount
  const total = totalBeforePoints - appliedPoints

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      toast.error('필수 정보를 모두 입력해주세요')
      return
    }
    
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast.error('결제 수단을 선택해주세요')
      return
    }
    
    setCurrentStep('review')
  }

  const handlePlaceOrder = async () => {
    if (!agreeToPurchase) {
      toast.error('구매 동의에 체크해주세요')
      return
    }

    setIsProcessing(true)
    
    try {
      // 주문 처리 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 포인트 사용 처리
      if (appliedPoints > 0) {
        usePoints(appliedPoints, '상품 구매', `ORDER-${Date.now()}`)
      }
      
      // 포인트 적립 (결제 금액의 1%)
      const earnedPoints = Math.floor(total * 0.01)
      if (earnedPoints > 0) {
        earnPoints(earnedPoints, '구매 적립', `ORDER-${Date.now()}`)
      }
      
      // 주문 성공
      clearCart()
      removeCoupon()
      removePoints()
      toast.success('주문이 완료되었습니다!')
      router.push('/orders/success')
    } catch (error) {
      toast.error('주문 처리 중 오류가 발생했습니다')
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = [
    { id: 'shipping', name: '배송 정보', icon: MapPin },
    { id: 'payment', name: '결제 수단', icon: CreditCard },
    { id: 'review', name: '주문 확인', icon: Check }
  ]

  const getStepIndex = (step: Step) => {
    return steps.findIndex(s => s.id === step)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
        <p className="text-muted-foreground mb-8">
          주문을 진행하려면 로그인해주세요
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = getStepIndex(currentStep) >= index
          const isCompleted = getStepIndex(currentStep) > index

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className="text-sm mt-2">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors ${
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">배송 정보</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        받는 분 <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="홍길동"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        연락처 <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="010-0000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      이메일
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      우편번호 <span className="text-destructive">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="00000"
                      />
                      <Button type="button" variant="outline">
                        우편번호 찾기
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      주소 <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="기본 주소"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      상세 주소
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.detailAddress}
                      onChange={(e) => setShippingInfo({...shippingInfo, detailAddress: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="동/호수 등 상세 주소"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      배송 메모
                    </label>
                    <textarea
                      value={shippingInfo.memo}
                      onChange={(e) => setShippingInfo({...shippingInfo, memo: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="배송 시 요청사항을 입력해주세요"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    다음 단계
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Payment Method */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">결제 수단</h2>
                
                <div className="space-y-3">
                  {[
                    { id: 'credit_card', name: '신용/체크카드', icon: CreditCard },
                    { id: 'kakao_pay', name: '카카오페이', icon: CreditCard },
                    { id: 'naver_pay', name: '네이버페이', icon: CreditCard },
                    { id: 'toss', name: '토스', icon: CreditCard },
                    { id: 'bank_transfer', name: '무통장입금', icon: CreditCard }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary"
                      />
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('shipping')}
                    className="flex-1"
                    size="lg"
                  >
                    이전 단계
                  </Button>
                  <Button
                    onClick={handlePaymentSubmit}
                    className="flex-1"
                    size="lg"
                  >
                    다음 단계
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Order Review */}
            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Shipping Info Review */}
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">배송 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="text-muted-foreground w-20">받는 분:</span>
                      <span>{shippingInfo.name}</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground w-20">연락처:</span>
                      <span>{shippingInfo.phone}</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground w-20">주소:</span>
                      <span>
                        {shippingInfo.address} {shippingInfo.detailAddress}
                      </span>
                    </div>
                    {shippingInfo.memo && (
                      <div className="flex">
                        <span className="text-muted-foreground w-20">메모:</span>
                        <span>{shippingInfo.memo}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Review */}
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">결제 수단</h3>
                  <p className="text-sm">
                    {paymentMethod === 'credit_card' && '신용/체크카드'}
                    {paymentMethod === 'kakao_pay' && '카카오페이'}
                    {paymentMethod === 'naver_pay' && '네이버페이'}
                    {paymentMethod === 'toss' && '토스'}
                    {paymentMethod === 'bank_transfer' && '무통장입금'}
                  </p>
                </div>

                {/* Agreement */}
                <div className="bg-card border rounded-lg p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToPurchase}
                      onChange={(e) => setAgreeToPurchase(e.target.checked)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-medium">구매 조건 확인 및 결제 진행 동의</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        주문 내용을 확인하였으며, 정보 제공 등에 동의합니다
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('payment')}
                    className="flex-1"
                    size="lg"
                    disabled={isProcessing}
                  >
                    이전 단계
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1"
                    size="lg"
                    disabled={!agreeToPurchase || isProcessing}
                  >
                    {isProcessing ? '처리 중...' : `${formatPrice(total)} 결제하기`}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 overflow-hidden rounded-md bg-muted shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      수량: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      {formatPrice((item.product.sale_price || item.product.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 쿠폰 적용 */}
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">할인 쿠폰</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="쿠폰 코드 입력"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {appliedCoupon ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      removeCoupon()
                      setCouponCode('')
                    }}
                  >
                    취소
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => applyCoupon(couponCode, subtotal)}
                    disabled={!couponCode}
                  >
                    적용
                  </Button>
                )}
              </div>
              {appliedCoupon && (
                <p className="text-xs text-green-600 mt-1">
                  {appliedCoupon.name} 적용됨
                </p>
              )}
            </div>

            {/* 포인트 사용 */}
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">
                포인트 사용 (보유: {userPoints.toLocaleString()}P)
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="0"
                  value={pointsToUse || ''}
                  onChange={(e) => setPointsToUse(Number(e.target.value))}
                  max={userPoints}
                  min={0}
                  className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {appliedPoints > 0 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      removePoints()
                      setPointsToUse(0)
                    }}
                  >
                    취소
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => applyPoints(pointsToUse, totalBeforePoints)}
                    disabled={!pointsToUse || pointsToUse < 1000}
                  >
                    사용
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                최소 1,000P부터 사용 가능
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>상품 금액</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>배송비</span>
                <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                  {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>쿠폰 할인</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              {appliedPoints > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>포인트 사용</span>
                  <span>-{formatPrice(appliedPoints)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>총 결제금액</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                구매 시 {Math.floor(total * 0.01)}P 적립 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}