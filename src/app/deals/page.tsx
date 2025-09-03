'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { Percent, Clock, Flame } from 'lucide-react'
import { Product } from '@/types'
import { sampleProducts } from '@/data/sampleProducts'

export default function DealsPage() {
  const [deals, setDeals] = useState<Product[]>([])
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    // 할인 상품만 필터링
    const dealProducts = sampleProducts.filter(product => product.sale_price)
    setDeals(dealProducts)
  }, [])

  useEffect(() => {
    // 타이머 카운트다운
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hotDeals = deals.filter(p => p.featured).slice(0, 4)
  const limitedDeals = deals.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 특가 히어로 배너 */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <Flame className="inline-block mr-2 mb-2" size={48} />
              특가 상품
            </h1>
            <p className="text-xl mb-8">놓치면 후회하는 한정 특가!</p>
            
            {/* 타이머 */}
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm">시간</div>
              </div>
              <div className="text-3xl font-bold flex items-center">:</div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm">분</div>
              </div>
              <div className="text-3xl font-bold flex items-center">:</div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm">초</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HOT 딜 섹션 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="text-red-500" />
              HOT 딜
            </h2>
            <span className="text-sm text-gray-500">최대 50% 할인</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hotDeals.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                  -{Math.round(((product.price - (product.sale_price || product.price)) / product.price) * 100)}%
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* 타임딜 섹션 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="text-blue-500" />
              타임딜
            </h2>
            <span className="text-sm text-gray-500">오늘만 특가</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {limitedDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 카테고리별 특가 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <Percent size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">전자제품 특가</h3>
            <p className="mb-4">최대 40% 할인</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
              쇼핑하기
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <Percent size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">패션 특가</h3>
            <p className="mb-4">최대 50% 할인</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
              쇼핑하기
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <Percent size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">뷰티 특가</h3>
            <p className="mb-4">최대 30% 할인</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
              쇼핑하기
            </button>
          </div>
        </div>

        {/* 모든 특가 상품 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            모든 특가 상품
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}