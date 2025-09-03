'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign, Calendar, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface SalesData {
  date: string
  revenue: number
  orders: number
  customers: number
}

interface ProductSales {
  name: string
  quantity: number
  revenue: number
  growth: number
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('week')
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [topProducts, setTopProducts] = useState<ProductSales[]>([])

  useEffect(() => {
    // 더미 데이터
    const dummySales: SalesData[] = [
      { date: '2025-01-27', revenue: 2350000, orders: 45, customers: 38 },
      { date: '2025-01-28', revenue: 2890000, orders: 52, customers: 44 },
      { date: '2025-01-29', revenue: 1980000, orders: 38, customers: 32 },
      { date: '2025-01-30', revenue: 3120000, orders: 58, customers: 49 },
      { date: '2025-01-31', revenue: 2750000, orders: 48, customers: 41 },
      { date: '2025-02-01', revenue: 3450000, orders: 62, customers: 53 },
      { date: '2025-02-02', revenue: 3890000, orders: 68, customers: 58 }
    ]

    const dummyProducts: ProductSales[] = [
      { name: '무선 이어폰 프로 Max', quantity: 156, revenue: 23400000, growth: 15.5 },
      { name: '스마트워치 Ultra', quantity: 98, revenue: 19600000, growth: 8.2 },
      { name: '노트북 스탠드 프리미엄', quantity: 234, revenue: 11700000, growth: -2.3 },
      { name: '무선 충전기 3in1', quantity: 187, revenue: 9350000, growth: 22.1 },
      { name: 'USB-C 허브 7포트', quantity: 145, revenue: 7250000, growth: 5.8 }
    ]

    setSalesData(dummySales)
    setTopProducts(dummyProducts)
  }, [period])

  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0)
  const totalOrders = salesData.reduce((sum, data) => sum + data.orders, 0)
  const totalCustomers = salesData.reduce((sum, data) => sum + data.customers, 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">매출 분석</h1>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="quarter">이번 분기</option>
            <option value="year">올해</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">총 매출</p>
              <p className="text-2xl font-bold">₩{(totalRevenue / 1000000).toFixed(1)}M</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">12.5%</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">총 주문</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">8.3%</span>
              </div>
            </div>
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">구매 고객</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-xs">-2.1%</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">평균 주문액</p>
              <p className="text-2xl font-bold">₩{(avgOrderValue / 1000).toFixed(0)}K</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">5.7%</span>
              </div>
            </div>
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">매출 추이</h2>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-muted-foreground">{data.date}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-primary/10 rounded-md relative">
                      <div 
                        className="h-full bg-primary rounded-md"
                        style={{ width: `${(data.revenue / 4000000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-28 text-right text-sm font-medium">
                    ₩{(data.revenue / 1000000).toFixed(1)}M
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">카테고리별 매출</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">전자제품</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">패션</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">홈 & 리빙</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">뷰티</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">스포츠</span>
                  <span className="text-sm font-medium">4%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '4%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">인기 상품 TOP 5</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4">순위</th>
                <th className="text-left p-4">상품명</th>
                <th className="text-left p-4">판매량</th>
                <th className="text-left p-4">매출액</th>
                <th className="text-left p-4">성장률</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4">#{index + 1}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.quantity}개</td>
                  <td className="p-4">₩{(product.revenue / 1000000).toFixed(1)}M</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-1 ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{Math.abs(product.growth)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}