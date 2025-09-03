import { NextRequest, NextResponse } from 'next/server'
import { sampleProducts } from '@/data/sampleProducts'

// 대시보드 통계 생성
function generateStats() {
  const today = new Date()
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()
  
  // 이번 달 매출 (더미 데이터)
  const monthlyRevenue = Math.floor(Math.random() * 50000000) + 10000000
  const lastMonthRevenue = Math.floor(monthlyRevenue * 0.85)
  const revenueGrowth = ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
  
  // 주문 통계
  const totalOrders = Math.floor(Math.random() * 500) + 100
  const pendingOrders = Math.floor(totalOrders * 0.15)
  const processingOrders = Math.floor(totalOrders * 0.25)
  const shippedOrders = Math.floor(totalOrders * 0.35)
  const deliveredOrders = totalOrders - pendingOrders - processingOrders - shippedOrders
  
  // 고객 통계
  const totalCustomers = Math.floor(Math.random() * 5000) + 1000
  const newCustomers = Math.floor(totalCustomers * 0.08)
  const activeCustomers = Math.floor(totalCustomers * 0.4)
  
  // 상품 통계
  const totalProducts = sampleProducts.length
  const lowStockProducts = Math.floor(Math.random() * 10) + 5
  const outOfStockProducts = Math.floor(Math.random() * 5)
  
  // 일별 매출 데이터 (최근 7일)
  const dailyRevenue = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000000) + 1000000,
      orders: Math.floor(Math.random() * 50) + 10
    }
  })
  
  // 카테고리별 매출
  const categoryRevenue = [
    { category: '의류', revenue: Math.floor(monthlyRevenue * 0.35), percentage: 35 },
    { category: '전자제품', revenue: Math.floor(monthlyRevenue * 0.25), percentage: 25 },
    { category: '가구', revenue: Math.floor(monthlyRevenue * 0.2), percentage: 20 },
    { category: '식품', revenue: Math.floor(monthlyRevenue * 0.12), percentage: 12 },
    { category: '기타', revenue: Math.floor(monthlyRevenue * 0.08), percentage: 8 }
  ]
  
  // 인기 상품 TOP 5
  const topProducts = sampleProducts
    .filter(p => p.featured)
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.name,
      sales: Math.floor(Math.random() * 100) + 20,
      revenue: p.price * (Math.floor(Math.random() * 100) + 20)
    }))

  return {
    summary: {
      revenue: {
        current: monthlyRevenue,
        previous: lastMonthRevenue,
        growth: revenueGrowth
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders
      },
      customers: {
        total: totalCustomers,
        new: newCustomers,
        active: activeCustomers
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts
      }
    },
    charts: {
      dailyRevenue,
      categoryRevenue,
      topProducts
    },
    recentOrders: [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        customer: '김민수',
        total: 128000,
        status: 'processing',
        date: new Date().toISOString()
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        customer: '이영희',
        total: 89000,
        status: 'shipped',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        orderNumber: 'ORD-2024-003',
        customer: '박철수',
        total: 256000,
        status: 'pending',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  }
}

// GET /api/dashboard/stats - 대시보드 통계 조회
export async function GET(request: NextRequest) {
  const stats = generateStats()
  return NextResponse.json(stats)
}