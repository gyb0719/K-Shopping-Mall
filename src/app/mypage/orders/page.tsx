'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Package, Truck, ChevronRight, Filter } from 'lucide-react'

const orderData = [
  {
    id: '20240103',
    date: '2024-01-03',
    items: [
      { name: '나이키 에어맥스 270', price: 159000, quantity: 1, image: '/product1.jpg' },
      { name: '아디다스 울트라부스트', price: 189000, quantity: 1, image: '/product2.jpg' }
    ],
    total: 348000,
    status: 'delivered',
    statusText: '배송완료',
    trackingNumber: '1234567890'
  },
  {
    id: '20240102',
    date: '2024-01-02',
    items: [
      { name: '뉴발란스 327', price: 129000, quantity: 1, image: '/product3.jpg' }
    ],
    total: 129000,
    status: 'shipping',
    statusText: '배송중',
    trackingNumber: '0987654321'
  },
  {
    id: '20240101',
    date: '2024-01-01',
    items: [
      { name: '컨버스 척테일러', price: 79000, quantity: 2, image: '/product4.jpg' },
      { name: '반스 올드스쿨', price: 89000, quantity: 1, image: '/product5.jpg' }
    ],
    total: 247000,
    status: 'preparing',
    statusText: '배송준비중',
    trackingNumber: null
  }
]

const statusColors = {
  delivered: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  shipping: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  preparing: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
}

export default function OrdersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('3months')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredOrders = orderData.filter(order => {
    if (filterStatus === 'all') return true
    return order.status === filterStatus
  })

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">주문 내역</h1>
        <p className="text-gray-600 dark:text-gray-400">주문하신 상품의 내역을 확인하실 수 있습니다</p>
      </div>

      {/* 필터 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* 기간 선택 */}
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-400" size={20} />
            <div className="flex space-x-2">
              {['1month', '3months', '6months', '1year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedPeriod === period
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {period === '1month' && '1개월'}
                  {period === '3months' && '3개월'}
                  {period === '6months' && '6개월'}
                  {period === '1year' && '1년'}
                </button>
              ))}
            </div>
          </div>

          {/* 상태 필터 */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
            >
              <option value="all">전체</option>
              <option value="preparing">배송준비중</option>
              <option value="shipping">배송중</option>
              <option value="delivered">배송완료</option>
              <option value="cancelled">취소/반품</option>
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* 주문 헤더 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.date} 주문
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    주문번호: {order.id}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
                  {order.statusText}
                </span>
              </div>
            </div>

            {/* 주문 상품 */}
            <div className="p-6 space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      수량: {item.quantity}개
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white mt-2">
                      ₩{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 주문 푸터 */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">총 결제금액</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₩{order.total.toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {order.trackingNumber && (
                    <button className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity">
                      배송 조회
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      리뷰 작성
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button className="px-4 py-2 text-sm border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      주문 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {filteredOrders.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 dark:text-gray-400">주문 내역이 없습니다</p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
          >
            쇼핑 계속하기
          </Link>
        </div>
      )}
    </div>
  )
}