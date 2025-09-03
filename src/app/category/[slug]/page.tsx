'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { SlidersHorizontal, Grid, List } from 'lucide-react'
import { Product } from '@/types'
import { sampleProducts } from '@/data/sampleProducts'
import { useParams } from 'next/navigation'

const categoryInfo = {
  'electronics': {
    name: '전자제품',
    description: '최신 전자제품과 가전제품을 만나보세요',
    image: 'https://picsum.photos/1600/400?random=301'
  },
  'fashion': {
    name: '패션',
    description: '트렌디한 패션 아이템으로 스타일을 완성하세요',
    image: 'https://picsum.photos/1600/400?random=302'
  },
  'home-living': {
    name: '홈 & 리빙',
    description: '집을 더 아름답고 편안하게 만들어보세요',
    image: 'https://picsum.photos/1600/400?random=303'
  },
  'beauty': {
    name: '뷰티',
    description: '당신의 아름다움을 더욱 빛나게 해줄 제품들',
    image: 'https://picsum.photos/1600/400?random=304'
  },
  'sports': {
    name: '스포츠',
    description: '건강하고 활기찬 라이프스타일을 위한 스포츠 용품',
    image: 'https://picsum.photos/1600/400?random=305'
  }
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

  const category = categoryInfo[slug as keyof typeof categoryInfo] || {
    name: '카테고리',
    description: '상품을 둘러보세요',
    image: 'https://picsum.photos/1600/400?random=306'
  }

  useEffect(() => {
    // 카테고리에 맞는 상품 필터링 (실제로는 API 호출)
    const categoryProducts = sampleProducts.filter(product => {
      // 카테고리별 상품 필터링 로직
      if (slug === 'electronics') {
        return product.category.slug === 'electronics' || product.tags.includes('전자제품')
      } else if (slug === 'fashion') {
        return product.category.slug === 'clothing' || product.tags.includes('패션')
      } else if (slug === 'beauty') {
        return product.tags.includes('뷰티') || product.tags.includes('화장품')
      } else if (slug === 'sports') {
        return product.tags.includes('운동') || product.tags.includes('스포츠')
      }
      return true
    })
    
    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
    setLoading(false)
  }, [slug])

  useEffect(() => {
    let sorted = [...products]
    
    // 정렬
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
        break
      case 'price-high':
        sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
        break
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
      default:
        sorted.sort((a, b) => b.review_count - a.review_count)
    }
    
    // 가격 필터
    sorted = sorted.filter(product => {
      const price = product.sale_price || product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })
    
    setFilteredProducts(sorted)
  }, [sortBy, priceRange, products])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 카테고리 히어로 */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg md:text-xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 및 정렬 바 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <SlidersHorizontal size={20} />
              <span>필터</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="popular">인기순</option>
              <option value="newest">최신순</option>
              <option value="price-low">낮은 가격순</option>
              <option value="price-high">높은 가격순</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500'}`}
            >
              <List size={20} />
            </button>
            <span className="ml-4 text-sm text-gray-500">
              {filteredProducts.length}개의 상품
            </span>
          </div>
        </div>

        {/* 상품 그리드 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{product.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {product.sale_price ? (
                      <>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ₩{product.sale_price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₩{product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ₩{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-80">
                    장바구니
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    위시리스트
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 상품이 없을 때 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">해당 카테고리에 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}