import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Product } from '@/types'

// 간단한 ProductCard 컴포넌트 모의
const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  return (
    <div data-testid="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div>
        {product.sale_price ? (
          <>
            <span data-testid="sale-price">₩{product.sale_price.toLocaleString()}</span>
            <span data-testid="original-price" style={{ textDecoration: 'line-through' }}>
              ₩{product.price.toLocaleString()}
            </span>
          </>
        ) : (
          <span data-testid="price">₩{product.price.toLocaleString()}</span>
        )}
      </div>
      <div>
        <span data-testid="rating">⭐ {product.rating}</span>
        <span data-testid="review-count">({product.review_count})</span>
      </div>
      {product.stock > 0 ? (
        <button onClick={() => onAddToCart(product)}>장바구니에 추가</button>
      ) : (
        <button disabled>품절</button>
      )}
    </div>
  )
}

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: '테스트 티셔츠',
    slug: 'test-tshirt',
    description: '편안한 코튼 티셔츠',
    price: 29000,
    sale_price: 19000,
    images: ['test-image.jpg'],
    category: {
      id: 'cat1',
      name: '의류',
      slug: 'clothing',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
    category_id: 'cat1',
    brand: '테스트 브랜드',
    sku: 'TEST001',
    stock: 10,
    featured: true,
    rating: 4.5,
    review_count: 123,
    tags: ['cotton', 'casual'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }

  const mockAddToCart = jest.fn()

  beforeEach(() => {
    mockAddToCart.mockClear()
  })

  test('상품 정보가 올바르게 표시된다', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)

    expect(screen.getByText('테스트 티셔츠')).toBeInTheDocument()
    expect(screen.getByText('편안한 코튼 티셔츠')).toBeInTheDocument()
    expect(screen.getByTestId('sale-price')).toHaveTextContent('₩19,000')
    expect(screen.getByTestId('original-price')).toHaveTextContent('₩29,000')
    expect(screen.getByTestId('rating')).toHaveTextContent('⭐ 4.5')
    expect(screen.getByTestId('review-count')).toHaveTextContent('(123)')
  })

  test('할인 가격이 없으면 정상 가격만 표시된다', () => {
    const productWithoutSale = { ...mockProduct, sale_price: undefined }
    render(<ProductCard product={productWithoutSale} onAddToCart={mockAddToCart} />)

    expect(screen.getByTestId('price')).toHaveTextContent('₩29,000')
    expect(screen.queryByTestId('sale-price')).not.toBeInTheDocument()
    expect(screen.queryByTestId('original-price')).not.toBeInTheDocument()
  })

  test('장바구니 추가 버튼이 작동한다', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)

    const addButton = screen.getByText('장바구니에 추가')
    fireEvent.click(addButton)

    expect(mockAddToCart).toHaveBeenCalledTimes(1)
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  test('재고가 없으면 품절 버튼이 표시되고 비활성화된다', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStockProduct} onAddToCart={mockAddToCart} />)

    const soldOutButton = screen.getByText('품절')
    expect(soldOutButton).toBeDisabled()
    
    fireEvent.click(soldOutButton)
    expect(mockAddToCart).not.toHaveBeenCalled()
  })

  test('이미지가 올바른 src와 alt 속성을 가진다', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)

    const image = screen.getByAltText('테스트 티셔츠') as HTMLImageElement
    expect(image).toHaveAttribute('src', 'test-image.jpg')
  })

  test('상품 카드가 data-testid를 가진다', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)
    
    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })
})