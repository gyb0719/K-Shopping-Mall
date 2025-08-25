import { create } from 'zustand'
import { Review, ReviewStats } from '@/types/review'

interface ReviewStore {
  reviews: Record<string, Review[]>
  stats: Record<string, ReviewStats>
  addReview: (productId: string, review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void
  getProductReviews: (productId: string) => Review[]
  getProductStats: (productId: string) => ReviewStats
  markHelpful: (reviewId: string) => void
}

// Mock data for demo
const mockReviews: Record<string, Review[]> = {
  'wireless-earbuds-pro': [
    {
      id: '1',
      productId: 'wireless-earbuds-pro',
      userId: '1',
      userName: '김민수',
      rating: 5,
      title: '음질이 정말 좋아요!',
      comment: '노이즈 캔슬링 기능이 훌륭하고 음질도 깨끗합니다. 배터리도 오래가서 만족합니다.',
      verified: true,
      helpful: 23,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      productId: 'wireless-earbuds-pro',
      userId: '2',
      userName: '이지은',
      rating: 4,
      title: '가성비 좋은 제품',
      comment: '이 가격대에서 이 정도 성능이면 충분히 만족스럽습니다. 다만 귀가 작은 분들은 착용감이 불편할 수 있어요.',
      verified: true,
      helpful: 15,
      createdAt: '2024-01-10T14:20:00Z',
      updatedAt: '2024-01-10T14:20:00Z'
    }
  ],
  'smart-watch-x': [
    {
      id: '3',
      productId: 'smart-watch-x',
      userId: '3',
      userName: '박준호',
      rating: 5,
      title: '운동할 때 필수템!',
      comment: '운동 기록이 정확하고 디자인도 세련됐어요. 배터리도 3일은 거뜬히 갑니다.',
      verified: true,
      helpful: 34,
      createdAt: '2024-01-20T09:15:00Z',
      updatedAt: '2024-01-20T09:15:00Z'
    }
  ]
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: mockReviews,
  stats: {},

  addReview: (productId, review) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    set((state) => ({
      reviews: {
        ...state.reviews,
        [productId]: [...(state.reviews[productId] || []), newReview]
      }
    }))
  },

  getProductReviews: (productId) => {
    return get().reviews[productId] || []
  },

  getProductStats: (productId) => {
    const reviews = get().reviews[productId] || []
    
    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    let sum = 0

    reviews.forEach((review) => {
      sum += review.rating
      distribution[review.rating as keyof typeof distribution]++
    })

    return {
      average: sum / reviews.length,
      total: reviews.length,
      distribution
    }
  },

  markHelpful: (reviewId) => {
    set((state) => ({
      reviews: Object.fromEntries(
        Object.entries(state.reviews).map(([productId, reviews]) => [
          productId,
          reviews.map((review) =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          )
        ])
      )
    }))
  }
}))