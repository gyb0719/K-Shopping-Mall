'use client'

import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/utils'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CartSidebar() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCartStore()

  const totalPrice = getTotalPrice()
  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalTotal = totalPrice + shippingFee

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 z-50"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">장바구니 ({items.length})</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">장바구니가 비어있습니다</p>
                <p className="text-sm text-muted-foreground mb-6">
                  마음에 드는 상품을 담아보세요
                </p>
                <Button onClick={() => setIsOpen(false)} asChild>
                  <Link href="/products">쇼핑 계속하기</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 bg-card p-4 rounded-lg border"
                    >
                      {/* Product Image */}
                      <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-medium hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        
                        {item.selected_options && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {Object.entries(item.selected_options).map(([key, value]) => (
                              <span key={key}>{key}: {value} </span>
                            ))}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 rounded-md border hover:bg-accent transition-colors flex items-center justify-center"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="h-6 w-6 rounded-md border hover:bg-accent transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {formatPrice(
                                (item.product.sale_price || item.product.price) * item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  >
                    장바구니 비우기
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer with Totals */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>상품 금액</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>배송비</span>
                  <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                    {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
                  </span>
                </div>
                {totalPrice < 50000 && (
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(50000 - totalPrice)} 더 구매 시 무료배송
                  </p>
                )}
                <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t">
                  <span>총 결제금액</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    주문하기
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  쇼핑 계속하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

// Add missing Package import
import { Package } from 'lucide-react'