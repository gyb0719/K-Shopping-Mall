'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { sampleProducts } from '@/data/sampleProducts'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { Search, Filter, X, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState(sampleProducts)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState([
    '에어팟', '갤럭시 워치', '노트북', '운동화', '트렌치코트',
    '디퓨저', '요가매트', '덤벨', '크림', '립스틱'
  ])

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query) {
      handleSearch(query)
    }
  }, [query])

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults(sampleProducts)
      return
    }

    const filtered = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    setSearchResults(filtered)

    // Save to recent searches
    if (searchTerm.trim()) {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(s => s !== searchTerm)
      ].slice(0, 10)
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`
    window.history.pushState({}, '', newUrl)
    handleSearch(searchQuery)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    const newUrl = `/search?q=${encodeURIComponent(term)}`
    window.history.pushState({}, '', newUrl)
    handleSearch(term)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="상품명, 브랜드, 카테고리 검색..."
            className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSearchResults(sampleProducts)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      {/* Quick Search Tags */}
      {!query && (
        <div className="mb-8">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">최근 검색어</h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  전체 삭제
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">인기 검색어</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-3 py-1 border rounded-full text-sm hover:bg-accent transition-colors"
                >
                  <span className="text-primary font-medium mr-1">
                    {index + 1}
                  </span>
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              &apos;{query}&apos; 검색 결과
            </h2>
            <p className="text-muted-foreground mt-1">
              {searchResults.length}개의 상품을 찾았습니다
            </p>
          </div>

          {searchResults.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-muted-foreground mb-8">
                다른 검색어로 다시 시도해보세요
              </p>
              
              {/* Search Suggestions */}
              <div className="max-w-md mx-auto text-left">
                <h4 className="font-medium mb-3">검색 팁</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 검색어의 철자가 정확한지 확인해보세요</li>
                  <li>• 더 일반적인 검색어를 사용해보세요</li>
                  <li>• 검색어를 줄여보세요</li>
                  <li>• 카테고리를 통해 찾아보세요</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {searchResults.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Recommended Products when no query */}
      {!query && (
        <div>
          <h2 className="text-2xl font-bold mb-6">추천 상품</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {sampleProducts.slice(0, 10).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-12 bg-muted rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}