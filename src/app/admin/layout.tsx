'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  TrendingUp,
  FileText,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const adminNavItems = [
  {
    title: '대시보드',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: '상품 관리',
    href: '/admin/products',
    icon: Package
  },
  {
    title: '주문 관리',
    href: '/admin/orders',
    icon: ShoppingCart
  },
  {
    title: '고객 관리',
    href: '/admin/users',
    icon: Users
  },
  {
    title: '매출 분석',
    href: '/admin/analytics',
    icon: TrendingUp
  },
  {
    title: '리뷰 관리',
    href: '/admin/reviews',
    icon: FileText
  },
  {
    title: '설정',
    href: '/admin/settings',
    icon: Settings
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut, initializeAuth } = useAuthStore()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // 첫 마운트 시에만 실행
    initializeAuth()
  }, []) // 빈 의존성 배열

  useEffect(() => {
    // user 상태가 변경될 때만 체크
    if (!isChecking) return // 이미 체크 완료했으면 종료
    
    const checkUser = () => {
      // localStorage에서 직접 확인
      const storedUser = localStorage.getItem('auth-user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          if (userData && userData.role === 'admin') {
            setIsChecking(false)
            return
          }
        } catch {}
      }
      
      // 스토어의 user도 확인
      if (user && user.role === 'admin') {
        setIsChecking(false)
      } else if (!user && !storedUser) {
        // user도 없고 localStorage에도 없을 때만 리다이렉트
        setIsChecking(false)
        router.push('/login')
      }
    }

    // 약간의 지연 후 체크 (initializeAuth가 완료될 시간 확보)
    const timer = setTimeout(checkUser, 200)
    return () => clearTimeout(timer)
  }, [user, router, isChecking])

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  // 로딩 중일 때
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* 사이드바 */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            {/* 로고 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-xl">K</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    K-Shop
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">관리자</p>
                </div>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* 네비게이션 */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
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
            </nav>

            {/* 사용자 정보 */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300 font-semibold">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || '관리자'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* 모바일 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 메인 컨텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {/* 상단 헤더 */}
          <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Menu size={24} />
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {adminNavItems.find(item => item.href === pathname)?.title || '대시보드'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('ko-KR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </div>
              </div>
            </div>
          </header>

          {/* 페이지 컨텐츠 */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}