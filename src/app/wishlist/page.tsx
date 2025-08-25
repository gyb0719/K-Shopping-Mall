'use client'

import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()

  const handleAddAllToCart = () => {
    items.forEach(product => {
      addItem(product)
    })
    toast.success('모든 상품이 장바구니에 추가되었습니다')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">위시리스트</h1>
          <p className="text-muted-foreground">
            관심 상품 {items.length}개
          </p>
        </div>
        
        {items.length > 0 && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearWishlist}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              전체 삭제
            </Button>
            <Button onClick={handleAddAllToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              모두 장바구니에 담기
            </Button>
          </div>
        )}
      </div>

      {/* Wishlist Items */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            위시리스트가 비어있습니다
          </h2>
          <p className="text-muted-foreground mb-8">
            마음에 드는 상품을 위시리스트에 담아보세요
          </p>
          <Button asChild>
            <Link href="/products">상품 둘러보기</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      {/* Recommendations */}
      {items.length > 0 && items.length < 5 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">추천 상품</h2>
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              고객님의 취향에 맞는 추천 상품이 곧 제공될 예정입니다
            </p>
          </div>
        </div>
      )}
    </div>
  )
}