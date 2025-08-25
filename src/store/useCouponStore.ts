import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Coupon, UserCoupon, PointHistory } from '@/types/coupon'
import toast from 'react-hot-toast'

interface CouponStore {
  // 쿠폰 관련
  availableCoupons: Coupon[]
  userCoupons: UserCoupon[]
  appliedCoupon: Coupon | null
  
  // 포인트 관련
  userPoints: number
  pointHistory: PointHistory[]
  appliedPoints: number
  
  // 쿠폰 액션
  validateCoupon: (code: string, orderTotal: number) => Coupon | null
  applyCoupon: (code: string, orderTotal: number) => boolean
  removeCoupon: () => void
  getCouponDiscount: (total: number) => number
  
  // 포인트 액션
  applyPoints: (amount: number, orderTotal: number) => boolean
  removePoints: () => void
  earnPoints: (amount: number, description: string, orderId?: string) => void
  usePoints: (amount: number, description: string, orderId?: string) => void
  getPointsBalance: () => number
}

// 샘플 쿠폰 데이터
const sampleCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    name: '신규 가입 10% 할인',
    description: '첫 구매 시 10% 할인',
    type: 'percentage',
    value: 10,
    minPurchase: 30000,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1000,
    usedCount: 150,
    isActive: true
  },
  {
    id: '2',
    code: 'SAVE5000',
    name: '5,000원 할인',
    description: '50,000원 이상 구매 시 5,000원 할인',
    type: 'fixed',
    value: 5000,
    minPurchase: 50000,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 500,
    usedCount: 75,
    isActive: true
  },
  {
    id: '3',
    code: 'VIP20',
    name: 'VIP 20% 할인',
    description: 'VIP 회원 전용 20% 할인',
    type: 'percentage',
    value: 20,
    minPurchase: 100000,
    maxDiscount: 50000,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 100,
    usedCount: 10,
    isActive: true
  }
]

export const useCouponStore = create<CouponStore>()(
  persist(
    (set, get) => ({
      availableCoupons: sampleCoupons,
      userCoupons: [],
      appliedCoupon: null,
      userPoints: 5000, // 기본 포인트
      pointHistory: [
        {
          id: '1',
          userId: '1',
          type: 'earned',
          amount: 5000,
          description: '회원가입 축하 포인트',
          createdAt: '2024-01-01T00:00:00Z'
        }
      ],
      appliedPoints: 0,

      validateCoupon: (code, orderTotal) => {
        const coupon = get().availableCoupons.find(
          c => c.code === code.toUpperCase() && c.isActive
        )
        
        if (!coupon) {
          return null
        }

        const now = new Date()
        const validFrom = new Date(coupon.validFrom)
        const validUntil = new Date(coupon.validUntil)

        if (now < validFrom || now > validUntil) {
          toast.error('쿠폰 유효기간이 아닙니다.')
          return null
        }

        if (coupon.minPurchase && orderTotal < coupon.minPurchase) {
          toast.error(`최소 구매금액은 ${coupon.minPurchase.toLocaleString()}원입니다.`)
          return null
        }

        if (coupon.usedCount >= coupon.usageLimit) {
          toast.error('쿠폰이 모두 소진되었습니다.')
          return null
        }

        return coupon
      },

      applyCoupon: (code, orderTotal) => {
        const coupon = get().validateCoupon(code, orderTotal)
        
        if (!coupon) {
          return false
        }

        set({ appliedCoupon: coupon })
        toast.success(`쿠폰이 적용되었습니다: ${coupon.name}`)
        return true
      },

      removeCoupon: () => {
        set({ appliedCoupon: null })
        toast.success('쿠폰이 제거되었습니다.')
      },

      getCouponDiscount: (total) => {
        const coupon = get().appliedCoupon
        if (!coupon) return 0

        if (coupon.type === 'percentage') {
          const discount = (total * coupon.value) / 100
          return coupon.maxDiscount 
            ? Math.min(discount, coupon.maxDiscount)
            : discount
        } else {
          return Math.min(coupon.value, total)
        }
      },

      applyPoints: (amount, orderTotal) => {
        const balance = get().userPoints
        
        if (amount > balance) {
          toast.error('보유 포인트가 부족합니다.')
          return false
        }

        if (amount > orderTotal) {
          toast.error('주문 금액보다 많은 포인트를 사용할 수 없습니다.')
          return false
        }

        if (amount < 1000) {
          toast.error('최소 1,000 포인트부터 사용 가능합니다.')
          return false
        }

        set({ appliedPoints: amount })
        toast.success(`${amount.toLocaleString()} 포인트가 적용되었습니다.`)
        return true
      },

      removePoints: () => {
        set({ appliedPoints: 0 })
        toast.success('포인트 사용이 취소되었습니다.')
      },

      earnPoints: (amount, description, orderId) => {
        const history: PointHistory = {
          id: Date.now().toString(),
          userId: '1',
          type: 'earned',
          amount,
          description,
          orderId,
          createdAt: new Date().toISOString()
        }

        set((state) => ({
          userPoints: state.userPoints + amount,
          pointHistory: [history, ...state.pointHistory]
        }))
      },

      usePoints: (amount, description, orderId) => {
        const history: PointHistory = {
          id: Date.now().toString(),
          userId: '1',
          type: 'used',
          amount,
          description,
          orderId,
          createdAt: new Date().toISOString()
        }

        set((state) => ({
          userPoints: state.userPoints - amount,
          pointHistory: [history, ...state.pointHistory],
          appliedPoints: 0
        }))
      },

      getPointsBalance: () => get().userPoints
    }),
    {
      name: 'coupon-storage'
    }
  )
)