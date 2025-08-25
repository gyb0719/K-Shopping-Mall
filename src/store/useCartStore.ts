import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'
import toast from 'react-hot-toast'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, options?: Record<string, string>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  setIsOpen: (isOpen: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, options) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          item => item.product.id === product.id &&
          JSON.stringify(item.selected_options) === JSON.stringify(options)
        )

        if (existingItem) {
          set({
            items: currentItems.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
          toast.success(`${product.name} 수량이 업데이트되었습니다`)
        } else {
          set({
            items: [...currentItems, {
              id: `${product.id}-${Date.now()}`,
              product,
              quantity,
              selected_options: options
            }]
          })
          toast.success(`${product.name}이(가) 장바구니에 추가되었습니다`)
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
        toast.success('상품이 장바구니에서 제거되었습니다')
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },

      clearCart: () => {
        set({ items: [] })
        toast.success('장바구니가 비워졌습니다')
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.sale_price || item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      setIsOpen: (isOpen) => set({ isOpen })
    }),
    {
      name: 'cart-storage',
    }
  )
)