'use client'

import { Product } from '@/types'
import { formatPrice, cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, Package } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  
  const discountPercentage = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden rounded-lg bg-card border hover:shadow-lg transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product.images[0] ? (
              <>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.images[1] && (
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0"
                  />
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
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
              {product.stock <= 5 && product.stock > 0 && (
                <Badge variant="outline" className="bg-background">
                  {product.stock}개 남음
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary">
                  품절
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors",
                  isInWishlist(product.id) && "text-destructive"
                )}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isInWishlist(product.id) && "fill-current"
                  )}
                />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground mb-1">
                {product.brand || product.category.name}
              </p>
              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            {product.review_count > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.review_count})
                </span>
              </div>
            )}

            {/* Price */}
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

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}