'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  User,
  Package,
  Heart,
  MessageSquare,
  MapPin,
  CreditCard,
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const menuItems = [
  {
    title: '프로필',
    icon: User,
    href: '/mypage'
  },
  {
    title: '주문 내역',
    icon: Package,
    href: '/mypage/orders'
  },
  {
    title: '위시리스트',
    icon: Heart,
    href: '/mypage/wishlist'
  },
  {
    title: '리뷰 관리',
    icon: MessageSquare,
    href: '/mypage/reviews'
  },
  {
    title: '배송지 관리',
    icon: MapPin,
    href: '/mypage/addresses'
  },
  {
    title: '결제 수단',
    icon: CreditCard,
    href: '/mypage/payments'
  },
  {
    title: '계정 설정',
    icon: Settings,
    href: '/mypage/profile'
  }
]

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 헤더 */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              홈
            </Link>
            <ChevronRight className="text-gray-400" size={16} />
            <span className="text-gray-900 dark:text-white">마이페이지</span>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300">
              {user.name?.[0] || user.email[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name || '회원'}님 안녕하세요
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )
                })}
                
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">로그아웃</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}