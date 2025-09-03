import Link from 'next/link'
import { Home, Search, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-gray-200 dark:text-gray-800">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="text-gray-300 dark:text-gray-700" size={100} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 
          URL을 확인하시거나 아래 링크를 이용해주세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Home className="mr-2" size={18} />
            홈으로 가기
          </Link>
          
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <Search className="mr-2" size={18} />
            상품 둘러보기
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            인기 카테고리
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['의류', '전자제품', '가구', '식품', '도서'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}