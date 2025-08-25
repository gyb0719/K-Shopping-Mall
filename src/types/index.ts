export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price?: number
  images: string[]
  category: Category
  category_id: string
  brand?: string
  sku: string
  stock: number
  featured: boolean
  rating: number
  review_count: number
  tags: string[]
  specifications?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selected_options?: Record<string, string>
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  avatar_url?: string
  role: "customer" | "admin"
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  phone: string
  postal_code: string
  address: string
  detail_address: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping_fee: number
  discount: number
  total: number
  shipping_address: Address
  billing_address: Address
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product: Product
  quantity: number
  price: number
  total: number
  selected_options?: Record<string, string>
}

export type OrderStatus = 
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export type PaymentMethod = 
  | "credit_card"
  | "bank_transfer"
  | "kakao_pay"
  | "naver_pay"
  | "toss"

export type PaymentStatus = 
  | "pending"
  | "paid"
  | "failed"
  | "refunded"

export interface Review {
  id: string
  product_id: string
  user_id: string
  user: User
  rating: number
  title: string
  content: string
  images?: string[]
  helpful_count: number
  verified_purchase: boolean
  created_at: string
  updated_at: string
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  product: Product
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  description: string
  discount_type: "percentage" | "fixed"
  discount_value: number
  minimum_purchase?: number
  max_uses?: number
  used_count: number
  valid_from: string
  valid_until: string
  active: boolean
  created_at: string
  updated_at: string
}