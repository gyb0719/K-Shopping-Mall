'use client'

import React from 'react'
import { useRecentViewStore } from '@/store/useRecentViewStore'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { X, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function RecentlyViewed() {
  const { recentProducts, removeProduct, clearAll } = useRecentViewStore()

  if (recentProducts.length === 0) {
    return null
  }

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">최근 본 상품</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          모두 지우기
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {recentProducts.slice(0, 5).map((product) => (
          <div key={product.id} className="flex gap-3 group">
            <Link 
              href={`/products/${product.slug}`}
              className="relative w-16 h-16 overflow-hidden rounded-md bg-muted shrink-0"
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </Link>
            
            <div className="flex-1 min-w-0">
              <Link 
                href={`/products/${product.slug}`}
                className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {product.sale_price ? (
                  <>
                    <span className="text-sm font-semibold text-primary">
                      {formatPrice(product.sale_price)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => removeProduct(product.id)}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        ))}
      </div>

      {recentProducts.length > 5 && (
        <Link 
          href="/recent-products"
          className="block text-center text-sm text-primary hover:underline mt-3 pt-3 border-t"
        >
          전체 보기 ({recentProducts.length}개)
        </Link>
      )}
    </div>
  )
}