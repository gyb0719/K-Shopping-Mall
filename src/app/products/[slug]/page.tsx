'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { sampleProducts } from '@/data/sampleProducts'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useReviewStore } from '@/store/useReviewStore'
import { useRecentViewStore } from '@/store/useRecentViewStore'
import { formatPrice, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProductSection } from '@/components/home/ProductSection'
import { ReviewList } from '@/components/review/ReviewList'
import { ReviewStats } from '@/components/review/ReviewStats'
import { ReviewForm } from '@/components/review/ReviewForm'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Package
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductDetailPage() {
  const params = useParams()
  const product = sampleProducts.find(p => p.slug === params.slug)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [showReviewForm, setShowReviewForm] = useState(false)
  
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { getProductReviews, getProductStats, markHelpful } = useReviewStore()
  const { addProduct } = useRecentViewStore()
  
  // 상품 페이지 접속 시 최근 본 상품에 추가
  useEffect(() => {
    if (product) {
      addProduct(product)
    }
  }, [product, addProduct])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <Link href="/products">
          <Button>상품 목록으로 돌아가기</Button>
        </Link>
      </div>
    )
  }

  const reviews = getProductReviews(product.slug)
  const reviewStats = getProductStats(product.slug)
  
  const discountPercentage = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const relatedProducts = sampleProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          상품
        </Link>
        <span>/</span>
        <Link 
          href={`/category/${product.category.slug}`}
          className="hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                {product.images[selectedImage] ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => 
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => 
                    (prev + 1) % product.images.length
                  )}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  인기
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Brand */}
          <div>
            {product.brand && (
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.review_count}개 리뷰)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            {product.sale_price ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="destructive">
                  {discountPercentage}% 할인
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">
                  재고 있음 ({product.stock}개)
                </span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-500">품절</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">수량</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-accent transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-accent transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                최대 {product.stock}개
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              장바구니 담기
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isInWishlist(product.id) && "fill-current text-destructive"
                )}
              />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Buy Now Button */}
          <Button size="lg" variant="secondary" className="w-full">
            바로 구매하기
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs">무료배송</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs">정품보증</p>
            </div>
            <div className="text-center">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs">교환/반품</p>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <div className="border-b">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={cn(
                "pb-4 px-1 font-medium transition-colors relative",
                activeTab === 'description'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              상품 설명
              {activeTab === 'description' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={cn(
                "pb-4 px-1 font-medium transition-colors relative",
                activeTab === 'specs'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              상세 정보
              {activeTab === 'specs' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={cn(
                "pb-4 px-1 font-medium transition-colors relative",
                activeTab === 'reviews'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              리뷰 ({reviewStats.total})
              {activeTab === 'reviews' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
        </div>

        <div className="py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-semibold mb-4">상품 설명</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">주요 특징</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>고품질 소재로 제작되어 내구성이 뛰어납니다</li>
                    <li>세련된 디자인으로 어떤 스타일에도 잘 어울립니다</li>
                    <li>편안한 착용감을 제공합니다</li>
                    <li>관리가 쉽고 오래 사용할 수 있습니다</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-xl font-semibold mb-4">상세 정보</h3>
                <div className="bg-muted/50 rounded-lg p-6">
                  <dl className="space-y-4">
                    <div className="flex">
                      <dt className="w-1/3 font-medium">브랜드</dt>
                      <dd className="w-2/3 text-muted-foreground">
                        {product.brand || '-'}
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium">카테고리</dt>
                      <dd className="w-2/3 text-muted-foreground">
                        {product.category.name}
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium">SKU</dt>
                      <dd className="w-2/3 text-muted-foreground">
                        {product.sku}
                      </dd>
                    </div>
                    {product.specifications && 
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex">
                          <dt className="w-1/3 font-medium">{key}</dt>
                          <dd className="w-2/3 text-muted-foreground">{value}</dd>
                        </div>
                      ))
                    }
                  </dl>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">고객 리뷰</h3>
                  <Button onClick={() => setShowReviewForm(true)}>
                    리뷰 작성하기
                  </Button>
                </div>

                {reviewStats.total > 0 && (
                  <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <ReviewStats stats={reviewStats} />
                  </div>
                )}

                <ReviewList 
                  reviews={reviews} 
                  onMarkHelpful={markHelpful}
                />

                {showReviewForm && (
                  <ReviewForm
                    productId={product.slug}
                    onClose={() => setShowReviewForm(false)}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="관련 상품"
          subtitle="비슷한 상품을 찾아보세요"
          products={relatedProducts}
        />
      )}
    </div>
  )
}