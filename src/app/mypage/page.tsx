'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  RotateCcw,
  Heart,
  Star,
  ShoppingBag,
  TrendingUp,
  Gift,
  Crown
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const orderStatusData = [
  { status: '주문접수', count: 1, icon: ShoppingBag },
  { status: '결제완료', count: 2, icon: CheckCircle },
  { status: '배송준비', count: 0, icon: Package },
  { status: '배송중', count: 1, icon: Truck },
  { status: '배송완료', count: 5, icon: CheckCircle },
  { status: '교환/반품', count: 0, icon: RotateCcw }
]

const quickMenus = [
  { title: '주문 내역', href: '/mypage/orders', icon: Package, count: 9 },
  { title: '위시리스트', href: '/mypage/wishlist', icon: Heart, count: 12 },
  { title: '작성 가능한 리뷰', href: '/mypage/reviews', icon: Star, count: 3 },
  { title: '쿠폰', href: '/mypage/coupons', icon: Gift, count: 5 }
]

export default function MyPage() {
  const { user } = useAuthStore()
  const [membershipLevel, setMembershipLevel] = useState('Silver')
  const [totalOrders, setTotalOrders] = useState(9)
  const [totalSpent, setTotalSpent] = useState(486000)
  const [points, setPoints] = useState(4860)

  return (
    <div className="space-y-8">
      {/* 회원 등급 및 혜택 */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Crown className="text-yellow-400" size={24} />
              <span className="text-2xl font-bold">{membershipLevel} 회원</span>
            </div>
            <p className="text-gray-300">다음 등급까지 514,000원 남았습니다</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">보유 포인트</p>
            <p className="text-3xl font-bold">{points.toLocaleString()}P</p>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-6">
          <div>
            <p className="text-sm text-gray-300">이번 달 구매액</p>
            <p className="text-xl font-semibold">₩{totalSpent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">이번 달 주문</p>
            <p className="text-xl font-semibold">{totalOrders}건</p>
          </div>
        </div>
      </div>

      {/* 주문 현황 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">주문 현황</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {orderStatusData.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.status}
                href="/mypage/orders"
                className="text-center group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors">
                    <Icon className="text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black" size={24} />
                  </div>
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.status}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickMenus.map((menu) => {
          const Icon = menu.icon
          return (
            <Link
              key={menu.title}
              href={menu.href}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-black dark:hover:border-white transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="text-gray-600 dark:text-gray-400" size={24} />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {menu.count}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{menu.title}</p>
            </Link>
          )
        })}
      </div>

      {/* 최근 주문 내역 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">최근 주문 내역</h2>
            <Link
              href="/mypage/orders"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              전체보기 →
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      나이키 에어맥스 외 2건
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      주문번호: 2024010{item}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2024.01.0{item} 주문
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ₩{(150000 + item * 20000).toLocaleString()}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                    배송중
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  배송 조회
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  리뷰 작성
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 관심 상품 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">관심 상품</h2>
          <Link
            href="/mypage/wishlist"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            전체보기 →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                상품명 {item}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ₩{(50000 * item).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}