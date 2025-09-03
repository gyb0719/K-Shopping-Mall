import { GET, POST } from '@/app/api/products/route'
import { NextRequest } from 'next/server'

describe('/api/products', () => {
  describe('GET', () => {
    test('상품 목록을 반환한다', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('products')
      expect(data).toHaveProperty('total')
      expect(data).toHaveProperty('page')
      expect(data).toHaveProperty('limit')
      expect(data).toHaveProperty('totalPages')
      expect(Array.isArray(data.products)).toBe(true)
    })

    test('카테고리 필터링이 작동한다', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?category=clothing')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      data.products.forEach((product: any) => {
        expect(product.category.slug).toBe('clothing')
      })
    })

    test('검색 필터링이 작동한다', async () => {
      const searchTerm = 'shirt'
      const request = new NextRequest(`http://localhost:3000/api/products?search=${searchTerm}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      data.products.forEach((product: any) => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const descMatch = product.description.toLowerCase().includes(searchTerm.toLowerCase())
        expect(nameMatch || descMatch).toBe(true)
      })
    })

    test('페이지네이션이 작동한다', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=1&limit=5')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.products.length).toBeLessThanOrEqual(5)
      expect(data.page).toBe(1)
      expect(data.limit).toBe(5)
    })

    test('정렬이 작동한다 - 가격 오름차순', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?sort=price-asc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      
      for (let i = 1; i < data.products.length; i++) {
        expect(data.products[i].price).toBeGreaterThanOrEqual(data.products[i - 1].price)
      }
    })

    test('정렬이 작동한다 - 가격 내림차순', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?sort=price-desc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      
      for (let i = 1; i < data.products.length; i++) {
        expect(data.products[i].price).toBeLessThanOrEqual(data.products[i - 1].price)
      }
    })
  })

  describe('POST', () => {
    test('새 상품을 생성할 수 있다', async () => {
      const newProduct = {
        name: '테스트 상품',
        description: '테스트 설명',
        price: 50000,
        category: { id: '1', name: '의류', slug: 'clothing' },
        category_id: '1',
        images: ['test.jpg'],
        sku: 'TEST-NEW-001',
        stock: 100,
        tags: ['new', 'test']
      }

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toHaveProperty('id')
      expect(data.name).toBe(newProduct.name)
      expect(data.price).toBe(newProduct.price)
      expect(data).toHaveProperty('created_at')
      expect(data).toHaveProperty('updated_at')
      expect(data).toHaveProperty('slug')
    })

    test('잘못된 데이터로 상품 생성 시 에러를 반환한다', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: 'invalid json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty('error')
    })
  })
})