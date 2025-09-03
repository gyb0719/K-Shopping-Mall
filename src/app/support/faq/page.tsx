'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'

const faqCategories = [
  {
    id: 'order',
    title: '주문/결제',
    questions: [
      {
        q: '주문을 취소하고 싶어요',
        a: '주문 취소는 상품 준비 전까지만 가능합니다. 마이페이지 > 주문내역에서 취소하실 수 있으며, 상품 준비 중인 경우 고객센터로 문의해 주세요.'
      },
      {
        q: '결제 수단을 변경할 수 있나요?',
        a: '주문 완료 후에는 결제 수단 변경이 불가능합니다. 주문을 취소하신 후 다시 주문해 주시기 바랍니다.'
      },
      {
        q: '무통장 입금은 언제까지 해야 하나요?',
        a: '주문일로부터 7일 이내에 입금해 주셔야 합니다. 7일이 경과하면 자동으로 주문이 취소됩니다.'
      },
      {
        q: '해외 카드로도 결제가 가능한가요?',
        a: '해외 발행 신용카드는 일부 카드사만 가능합니다. VISA, MasterCard, AMEX 카드를 이용하실 수 있습니다.'
      }
    ]
  },
  {
    id: 'shipping',
    title: '배송',
    questions: [
      {
        q: '배송은 얼마나 걸리나요?',
        a: '일반 배송은 결제 완료 후 2-3일, 당일 배송은 오후 2시 이전 주문 시 당일 수령 가능합니다. (주말/공휴일 제외)'
      },
      {
        q: '배송비는 얼마인가요?',
        a: '3만원 이상 구매 시 무료배송이며, 3만원 미만 구매 시 3,000원의 배송비가 부과됩니다.'
      },
      {
        q: '배송지를 변경하고 싶어요',
        a: '상품 발송 전까지는 마이페이지에서 배송지 변경이 가능합니다. 이미 발송된 경우 변경이 불가능합니다.'
      },
      {
        q: '해외 배송이 가능한가요?',
        a: '현재 해외 배송 서비스는 제공하지 않습니다. 국내 배송만 가능합니다.'
      }
    ]
  },
  {
    id: 'return',
    title: '교환/반품',
    questions: [
      {
        q: '교환/반품은 언제까지 가능한가요?',
        a: '상품 수령일로부터 7일 이내에 가능합니다. 단, 상품 하자의 경우 30일 이내 교환/반품이 가능합니다.'
      },
      {
        q: '교환/반품 비용은 누가 부담하나요?',
        a: '단순 변심의 경우 고객님 부담, 상품 하자의 경우 판매자 부담입니다.'
      },
      {
        q: '교환/반품이 불가능한 경우가 있나요?',
        a: '상품 포장을 개봉하여 상품 가치가 훼손된 경우, 시간 경과로 재판매가 곤란한 경우 등은 교환/반품이 제한될 수 있습니다.'
      },
      {
        q: '환불은 언제 받을 수 있나요?',
        a: '반품 상품 도착 후 검수 완료되면 3영업일 이내에 환불 처리됩니다.'
      }
    ]
  },
  {
    id: 'member',
    title: '회원정보',
    questions: [
      {
        q: '비밀번호를 잊어버렸어요',
        a: '로그인 페이지에서 "비밀번호 찾기"를 클릭하시면 이메일로 재설정 링크를 보내드립니다.'
      },
      {
        q: '회원 탈퇴는 어떻게 하나요?',
        a: '마이페이지 > 회원정보 > 회원탈퇴에서 진행하실 수 있습니다. 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.'
      },
      {
        q: '휴대폰 번호를 변경하고 싶어요',
        a: '마이페이지 > 회원정보 수정에서 변경 가능합니다. 본인 인증이 필요할 수 있습니다.'
      },
      {
        q: '이메일이 오지 않아요',
        a: '스팸 메일함을 확인해 주시고, 메일 수신 거부 설정을 해제해 주세요.'
      }
    ]
  }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('order')
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const currentCategory = faqCategories.find(cat => cat.id === selectedCategory)
  const filteredQuestions = currentCategory?.questions.filter(
    item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

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
            <Link href="/support" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              고객센터
            </Link>
            <ChevronRight className="text-gray-400" size={16} />
            <span className="text-gray-900 dark:text-white">자주 묻는 질문</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            자주 묻는 질문
          </h1>
          
          {/* 검색 바 */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 카테고리 사이드바 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-white">카테고리</h2>
              </div>
              <nav className="p-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.title}</span>
                      <span className="text-sm opacity-60">
                        {category.questions.length}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ 리스트 */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentCategory?.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  총 {filteredQuestions.length}개의 질문
                </p>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredQuestions.map((item, index) => (
                  <div key={index} className="group">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.q}
                          </p>
                        </div>
                        <ChevronDown 
                          className={`text-gray-400 transition-transform ${
                            openItems.includes(index) ? 'rotate-180' : ''
                          }`} 
                          size={20} 
                        />
                      </div>
                    </button>
                    
                    {openItems.includes(index) && (
                      <div className="px-6 pb-5">
                        <div className="pt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {filteredQuestions.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    검색 결과가 없습니다
                  </p>
                </div>
              )}
            </div>

            {/* 추가 도움말 */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                원하는 답변을 찾지 못하셨나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                고객센터로 직접 문의해 주시면 친절하게 답변해 드리겠습니다.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/support/contact"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
                >
                  1:1 문의하기
                </Link>
                <Link
                  href="/support"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  고객센터 홈
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}