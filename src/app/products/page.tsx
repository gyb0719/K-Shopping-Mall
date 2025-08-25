'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { sampleProducts, sampleCategories } from '@/data/sampleProducts'
import { Product } from '@/types'
import { RecentlyViewed } from '@/components/product/RecentlyViewed'
import { 
  Grid2X2, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  ChevronDown 
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
type ViewMode = 'grid' | 'list'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000])
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique brands
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)))

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory)
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === selectedBrand)
    }

    // Price filter
    filtered = filtered.filter(p => {
      const price = p.sale_price || p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
        break
      case 'price-desc':
        filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'popular':
      default:
        filtered.sort((a, b) => b.review_count - a.review_count)
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">전체 상품</h1>
        <p className="text-muted-foreground">
          총 {filteredProducts.length}개의 상품
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">카테고리</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  전체
                </button>
                {sampleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold mb-4">브랜드</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedBrand === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  전체
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand!)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedBrand === brand
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-4">가격대</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>₩0</span>
                  <span>₩{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              필터
            </Button>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-md border bg-background text-sm"
              >
                <option value="popular">인기순</option>
                <option value="newest">최신순</option>
                <option value="price-asc">낮은 가격순</option>
                <option value="price-desc">높은 가격순</option>
                <option value="rating">평점순</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mb-6 overflow-hidden"
              >
                <div className="space-y-4 pb-4 border-b">
                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-2">카테고리</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('all')}
                      >
                        전체
                      </Button>
                      {sampleCategories.map((category) => (
                        <Button
                          key={category.id}
                          size="sm"
                          variant={selectedCategory === category.id ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h4 className="font-medium mb-2">브랜드</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedBrand === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedBrand('all')}
                      >
                        전체
                      </Button>
                      {brands.map((brand) => (
                        <Button
                          key={brand}
                          size="sm"
                          variant={selectedBrand === brand ? 'default' : 'outline'}
                          onClick={() => setSelectedBrand(brand!)}
                        >
                          {brand}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                조건에 맞는 상품이 없습니다
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product, index) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} index={index} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// List View Component
function ProductListItem({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  
  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
      <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-md bg-muted">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      
      <div className="flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {product.sale_price ? (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist(product.id) && "fill-current text-destructive"
                )}
              />
            </Button>
            <Button
              size="sm"
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
            >
              장바구니 담기
            </Button>
          </div>
        </div>

        {/* Recently Viewed Sidebar */}
        <div className="lg:block hidden">
          <div className="sticky top-20">
            <RecentlyViewed />
          </div>
        </div>
      </div>
    </div>
  )
}

// Add required imports
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { formatPrice, cn } from '@/lib/utils'
import { Heart } from 'lucide-react'