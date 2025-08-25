'use client'

import Link from 'next/link'
import { Package, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: '전자제품', href: '/category/electronics' },
      { name: '패션', href: '/category/fashion' },
      { name: '홈 & 리빙', href: '/category/home-living' },
      { name: '뷰티', href: '/category/beauty' },
      { name: '스포츠', href: '/category/sports' },
    ],
    service: [
      { name: '고객센터', href: '/help' },
      { name: '배송 조회', href: '/tracking' },
      { name: '반품/교환', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: '공지사항', href: '/notices' },
    ],
    company: [
      { name: '회사 소개', href: '/about' },
      { name: '채용 정보', href: '/careers' },
      { name: '이용약관', href: '/terms' },
      { name: '개인정보처리방침', href: '/privacy' },
      { name: '제휴 문의', href: '/partnership' },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">K-Shop</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게 만들어드립니다.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1588-0000 (평일 09:00-18:00)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@kshop.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">쇼핑</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-semibold mb-4">고객 서비스</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-b mt-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-2">뉴스레터 구독</h3>
              <p className="text-sm text-muted-foreground">
                최신 상품과 특별 할인 정보를 받아보세요
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-sm text-muted-foreground">
            © {currentYear} K-Shop. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">결제 수단:</span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 border rounded text-xs">VISA</div>
              <div className="px-2 py-1 border rounded text-xs">MasterCard</div>
              <div className="px-2 py-1 border rounded text-xs">카카오페이</div>
              <div className="px-2 py-1 border rounded text-xs">네이버페이</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}