'use client'

import { Product } from '@/types'
import { ProductCard } from '@/components/products/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllLink?: string
}

export function ProductSection({ 
  title, 
  subtitle, 
  products, 
  viewAllLink 
}: ProductSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              전체보기
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}