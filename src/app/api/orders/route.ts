import { NextRequest, NextResponse } from 'next/server'
import { Order, OrderStatus } from '@/types'

// 메모리 저장소
const orders: Order[] = []

// GET /api/orders - 주문 목록 조회
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status') as OrderStatus | null
  const userId = searchParams.get('userId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filteredOrders = [...orders]

  // 상태 필터
  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status)
  }

  // 사용자 필터
  if (userId) {
    filteredOrders = filteredOrders.filter(o => o.user_id === userId)
  }

  // 최신순 정렬
  filteredOrders.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // 페이지네이션
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  return NextResponse.json({
    orders: paginatedOrders,
    total: filteredOrders.length,
    page,
    limit,
    totalPages: Math.ceil(filteredOrders.length / limit)
  })
}

// POST /api/orders - 주문 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const orderNumber = `ORD-${Date.now()}`
    const newOrder: Order = {
      id: Date.now().toString(),
      order_number: orderNumber,
      status: 'pending',
      payment_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...body
    }

    orders.push(newOrder)
    
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '주문 생성 실패' },
      { status: 400 }
    )
  }
}