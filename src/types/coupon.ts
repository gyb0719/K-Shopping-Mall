export interface Coupon {
  id: string
  code: string
  name: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit: number
  usedCount: number
  isActive: boolean
}

export interface UserCoupon {
  id: string
  couponId: string
  userId: string
  usedAt?: string
  expiresAt: string
}

export interface PointHistory {
  id: string
  userId: string
  type: 'earned' | 'used' | 'expired'
  amount: number
  description: string
  orderId?: string
  createdAt: string
}