import { NextRequest, NextResponse } from 'next/server'
import { sampleProducts } from '@/data/sampleProducts'
import { Product } from '@/types'

// 메모리 저장소 (실제 앱에서는 DB 사용)
const products: Product[] = [...sampleProducts]

// GET /api/products - 상품 목록 조회
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  let filteredProducts = [...products]

  // 카테고리 필터
  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.slug === category
    )
  }

  // 검색 필터
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(searchLower) ||
           p.description.toLowerCase().includes(searchLower)
    )
  }

  // 정렬
  switch (sort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filteredProducts.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      break
    case 'popular':
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
  }

  // 페이지네이션
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return NextResponse.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit)
  })
}

// POST /api/products - 상품 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProduct: Product = {
      id: Date.now().toString(),
      slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 0,
      review_count: 0,
      featured: false,
      stock: 100,
      ...body
    }

    products.push(newProduct)
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '상품 생성 실패' },
      { status: 400 }
    )
  }
}