import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface RecentViewStore {
  recentProducts: Product[]
  maxItems: number
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  clearAll: () => void
  getRecentProducts: () => Product[]
}

export const useRecentViewStore = create<RecentViewStore>()(
  persist(
    (set, get) => ({
      recentProducts: [],
      maxItems: 10,

      addProduct: (product) => {
        set((state) => {
          // 이미 있는 상품이면 맨 앞으로 이동
          const filtered = state.recentProducts.filter(p => p.id !== product.id)
          const updated = [product, ...filtered]
          // 최대 개수 제한
          return {
            recentProducts: updated.slice(0, state.maxItems)
          }
        })
      },

      removeProduct: (productId) => {
        set((state) => ({
          recentProducts: state.recentProducts.filter(p => p.id !== productId)
        }))
      },

      clearAll: () => {
        set({ recentProducts: [] })
      },

      getRecentProducts: () => {
        return get().recentProducts
      }
    }),
    {
      name: 'recent-view-storage'
    }
  )
)