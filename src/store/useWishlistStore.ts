import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'
import toast from 'react-hot-toast'

interface WishlistStore {
  items: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const currentItems = get().items
        const exists = currentItems.some(item => item.id === product.id)
        
        if (exists) {
          set({ items: currentItems.filter(item => item.id !== product.id) })
          toast.success('위시리스트에서 제거되었습니다')
        } else {
          set({ items: [...currentItems, product] })
          toast.success('위시리스트에 추가되었습니다')
        }
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
        toast.success('위시리스트가 비워졌습니다')
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
)