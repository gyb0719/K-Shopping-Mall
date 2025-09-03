'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  Package, 
  RotateCcw,
  Phone,
  Mail,
  Clock,
  ChevronRight
} from 'lucide-react'

const supportCategories = [
  {
    title: '자주 묻는 질문',
    description: '가장 많이 문의하시는 내용을 확인하세요',
    icon: HelpCircle,
    href: '/support/faq',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    title: '1:1 문의',
    description: '직접 문의사항을 남겨주세요',
    icon: MessageCircle,
    href: '/support/contact',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    title: '공지사항',
    description: '중요한 안내사항을 확인하세요',
    icon: FileText,
    href: '/support/notices',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    title: '배송 조회',
    description: '주문하신 상품의 배송 현황을 확인하세요',
    icon: Package,
    href: '/support/shipping',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    title: '교환/반품',
    description: '교환 및 반품 정책을 확인하세요',
    icon: RotateCcw,
    href: '/support/returns',
    color: 'text-gray-600 dark:text-gray-400'
  }
]

const contactInfo = [
  {
    icon: Phone,
    title: '전화 문의',
    content: '1577-1234',
    subContent: '평일 09:00 - 18:00'
  },
  {
    icon: Mail,
    title: '이메일 문의',
    content: 'support@kshop.com',
    subContent: '24시간 접수 가능'
  },
  {
    icon: Clock,
    title: '운영 시간',
    content: '평일 09:00 - 18:00',
    subContent: '주말/공휴일 휴무'
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 헤더 섹션 */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              고객센터
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              무엇을 도와드릴까요?
            </p>
            
            {/* 검색 바 */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                />
                <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 서비스 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {supportCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                href={category.href}
                className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-black dark:hover:border-white transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors">
                      <Icon className={`${category.color} group-hover:text-white dark:group-hover:text-black`} size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" size={20} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* 연락처 정보 */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            연락처 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <div key={info.title} className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-gray-700">
                    <Icon className="text-gray-600 dark:text-gray-400" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {info.content}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {info.subContent}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 빠른 답변 섹션 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            빠른 답변
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '주문을 취소하고 싶어요',
              '배송은 얼마나 걸리나요?',
              '반품/교환은 어떻게 하나요?',
              '결제 수단을 변경하고 싶어요',
              '회원 정보를 수정하고 싶어요',
              '비밀번호를 잊어버렸어요'
            ].map((question) => (
              <Link
                key={question}
                href="/support/faq"
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-black dark:hover:border-white transition-colors flex items-center justify-between group"
              >
                <span className="text-gray-700 dark:text-gray-300">{question}</span>
                <ChevronRight className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}