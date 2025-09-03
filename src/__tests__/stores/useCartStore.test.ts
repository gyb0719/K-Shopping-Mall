import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/types'

// Mock toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}))

describe('useCartStore', () => {
  const mockProduct: Product = {
    id: '1',
    name: '테스트 상품',
    slug: 'test-product',
    description: '테스트 설명',
    price: 10000,
    sale_price: 8000,
    images: ['test.jpg'],
    category: { id: '1', name: '의류', slug: 'clothing', created_at: '', updated_at: '' },
    category_id: '1',
    brand: '테스트 브랜드',
    sku: 'TEST001',
    stock: 10,
    featured: false,
    rating: 4.5,
    review_count: 100,
    tags: ['test'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }

  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.clearCart()
    })
  })

  test('장바구니에 상품을 추가할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 2)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.items[0].product.id).toBe('1')
  })

  test('동일한 상품을 추가하면 수량이 증가한다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    act(() => {
      result.current.addItem(mockProduct, 2)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(3)
  })

  test('상품을 장바구니에서 제거할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    const itemId = result.current.items[0].id

    act(() => {
      result.current.removeItem(itemId)
    })

    expect(result.current.items).toHaveLength(0)
  })

  test('상품 수량을 업데이트할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    const itemId = result.current.items[0].id

    act(() => {
      result.current.updateQuantity(itemId, 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
  })

  test('수량이 0이면 상품이 제거된다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    const itemId = result.current.items[0].id

    act(() => {
      result.current.updateQuantity(itemId, 0)
    })

    expect(result.current.items).toHaveLength(0)
  })

  test('장바구니 총 가격을 계산할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 2) // 8000 * 2 = 16000
    })

    expect(result.current.getTotalPrice()).toBe(16000)
  })

  test('장바구니 총 아이템 수를 계산할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 3)
    })

    expect(result.current.getTotalItems()).toBe(3)
  })

  test('장바구니를 비울 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
  })

  test('장바구니 열기/닫기 상태를 변경할 수 있다', () => {
    const { result } = renderHook(() => useCartStore())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.setIsOpen(true)
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.setIsOpen(false)
    })

    expect(result.current.isOpen).toBe(false)
  })
})