'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useTheme } from '@/providers/ThemeProvider'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Package,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { items, getTotalItems, setIsOpen: setCartOpen } = useCartStore()
  const { user, signOut } = useAuthStore()
  const { items: wishlistItems } = useWishlistStore()
  const { theme, setTheme } = useTheme()
  
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    { name: '전자제품', href: '/category/electronics' },
    { name: '패션', href: '/category/fashion' },
    { name: '홈 & 리빙', href: '/category/home-living' },
    { name: '뷰티', href: '/category/beauty' },
    { name: '스포츠', href: '/category/sports' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">무료 배송 5만원 이상</span>
            </div>
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-1 hover:bg-accent rounded-md transition-colors"
                  aria-label="테마 변경"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}
              <Link href="/help" className="hover:text-primary transition-colors">
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">K-Shop</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/deals"
                className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
              >
                특가상품
              </Link>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-accent rounded-md transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 ? (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              ) : null}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
              >
                <User className="h-5 w-5" />
                {user && <ChevronDown className="h-3 w-3" />}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-2"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium">{user.name || user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          <User className="h-4 w-4" />
                          내 계정
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          <Package className="h-4 w-4" />
                          주문 내역
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                            관리자
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            signOut()
                            setIsUserMenuOpen(false)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          로그아웃
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          로그인
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          회원가입
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <form onSubmit={handleSearch} className="py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="상품 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/deals"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
              >
                특가상품
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}