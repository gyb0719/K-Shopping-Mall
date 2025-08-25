export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: string
  updatedAt: string
}

export interface ReviewStats {
  average: number
  total: number
  distribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}