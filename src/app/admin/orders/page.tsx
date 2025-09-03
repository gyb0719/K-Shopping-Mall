'use client'

import { useState, useEffect } from 'react'
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Order {
  id: string
  order_number: string
  user_id: string
  status: string
  total: number
  created_at: string
  customer?: {
    name: string
    email: string
  }
  items?: Array<{
    product: {
      name: string
    }
    quantity: number
    price: number
  }>
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      // 더미 데이터 추가
      const ordersWithDetails = data.orders.length > 0 ? data.orders : [
        {
          id: '1',
          order_number: 'ORD-2024-001',
          user_id: '1',
          status: 'processing',
          total: 128000,
          created_at: new Date().toISOString(),
          customer: { name: '김민수', email: 'kim@example.com' },
          items: [
            { product: { name: '프리미엄 티셔츠' }, quantity: 2, price: 64000 }
          ]
        },
        {
          id: '2',
          order_number: 'ORD-2024-002',
          user_id: '2',
          status: 'shipped',
          total: 89000,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          customer: { name: '이영희', email: 'lee@example.com' },
          items: [
            { product: { name: '데님 자켓' }, quantity: 1, price: 89000 }
          ]
        },
        {
          id: '3',
          order_number: 'ORD-2024-003',
          user_id: '3',
          status: 'pending',
          total: 256000,
          created_at: new Date(Date.now() - 172800000).toISOString(),
          customer: { name: '박철수', email: 'park@example.com' },
          items: [
            { product: { name: '스마트워치' }, quantity: 1, price: 256000 }
          ]
        },
        {
          id: '4',
          order_number: 'ORD-2024-004',
          user_id: '4',
          status: 'delivered',
          total: 45000,
          created_at: new Date(Date.now() - 259200000).toISOString(),
          customer: { name: '정수민', email: 'jung@example.com' },
          items: [
            { product: { name: '무선 이어폰' }, quantity: 1, price: 45000 }
          ]
        },
        {
          id: '5',
          order_number: 'ORD-2024-005',
          user_id: '5',
          status: 'cancelled',
          total: 178000,
          created_at: new Date(Date.now() - 345600000).toISOString(),
          customer: { name: '최지원', email: 'choi@example.com' },
          items: [
            { product: { name: '캠핑 텐트' }, quantity: 1, price: 178000 }
          ]
        }
      ]
      setOrders(ordersWithDetails)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ))
      }
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />
      case 'processing':
        return <Package className="text-blue-500" size={16} />
      case 'shipped':
        return <Truck className="text-purple-500" size={16} />
      case 'delivered':
        return <CheckCircle className="text-green-500" size={16} />
      case 'cancelled':
        return <XCircle className="text-red-500" size={16} />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '대기중' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: '처리중' },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: '배송중' },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', label: '배송완료' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: '취소됨' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    
    return (
      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">주문 관리</h1>
        <p className="text-gray-500 dark:text-gray-400">총 {orders.length}개의 주문</p>
      </div>

      {/* 필터 & 검색 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="주문번호 또는 고객명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' ? '전체' :
                 status === 'pending' ? '대기중' :
                 status === 'processing' ? '처리중' :
                 status === 'shipped' ? '배송중' :
                 status === 'delivered' ? '배송완료' : '취소됨'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 주문 테이블 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  주문번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  고객정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  상품
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  주문일시
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.order_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.customer?.name || '고객'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customer?.email || 'email@example.com'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {order.items?.[0]?.product.name || '상품명'}
                      {order.items && order.items.length > 1 && (
                        <span className="text-gray-500"> 외 {order.items.length - 1}개</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ₩{order.total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye size={18} />
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="pending">대기중</option>
                        <option value="processing">처리중</option>
                        <option value="shipped">배송중</option>
                        <option value="delivered">배송완료</option>
                        <option value="cancelled">취소됨</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: '대기중', count: orders.filter(o => o.status === 'pending').length, color: 'yellow' },
          { label: '처리중', count: orders.filter(o => o.status === 'processing').length, color: 'blue' },
          { label: '배송중', count: orders.filter(o => o.status === 'shipped').length, color: 'purple' },
          { label: '배송완료', count: orders.filter(o => o.status === 'delivered').length, color: 'green' },
          { label: '취소됨', count: orders.filter(o => o.status === 'cancelled').length, color: 'red' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                <div className={`w-3 h-3 bg-${stat.color}-500 rounded-full`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}