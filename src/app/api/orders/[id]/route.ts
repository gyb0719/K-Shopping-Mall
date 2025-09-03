import { NextRequest, NextResponse } from 'next/server'
import { Order, OrderStatus } from '@/types'

// 메모리 저장소
let orders: Order[] = []

// GET /api/orders/[id] - 주문 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = orders.find(o => o.id === params.id)
  
  if (!order) {
    return NextResponse.json(
      { error: '주문을 찾을 수 없습니다' },
      { status: 404 }
    )
  }

  return NextResponse.json(order)
}

// PUT /api/orders/[id] - 주문 상태 변경
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    const updatedOrder = {
      ...orders[orderIndex],
      ...body,
      updated_at: new Date().toISOString()
    }

    orders[orderIndex] = updatedOrder
    
    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json(
      { error: '주문 수정 실패' },
      { status: 400 }
    )
  }
}