import { NextRequest, NextResponse } from 'next/server'
import { sampleProducts } from '@/data/sampleProducts'
import { Product } from '@/types'

// 메모리 저장소
let products: Product[] = [...sampleProducts]

// GET /api/products/[id] - 상품 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    return NextResponse.json(
      { error: '상품을 찾을 수 없습니다' },
      { status: 404 }
    )
  }

  return NextResponse.json(product)
}

// PUT /api/products/[id] - 상품 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const productIndex = products.findIndex(p => p.id === params.id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    const updatedProduct = {
      ...products[productIndex],
      ...body,
      updated_at: new Date().toISOString()
    }

    products[productIndex] = updatedProduct
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json(
      { error: '상품 수정 실패' },
      { status: 400 }
    )
  }
}

// DELETE /api/products/[id] - 상품 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productIndex = products.findIndex(p => p.id === params.id)
  
  if (productIndex === -1) {
    return NextResponse.json(
      { error: '상품을 찾을 수 없습니다' },
      { status: 404 }
    )
  }

  products.splice(productIndex, 1)
  
  return NextResponse.json(
    { message: '상품이 삭제되었습니다' },
    { status: 200 }
  )
}