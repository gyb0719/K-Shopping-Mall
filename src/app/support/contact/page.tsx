'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, 
  Phone, 
  Mail, 
  MessageCircle,
  Paperclip,
  X
} from 'lucide-react'

const inquiryTypes = [
  '주문/결제 문의',
  '배송 문의',
  '교환/반품 문의',
  '상품 문의',
  '회원정보 문의',
  '기타 문의'
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
    email: '',
    phone: '',
    orderNumber: '',
    attachments: [] as File[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 포트폴리오용이므로 실제 전송 없이 알림만
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    setFormData({
      type: '',
      title: '',
      content: '',
      email: '',
      phone: '',
      orderNumber: '',
      attachments: []
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles].slice(0, 5) // 최대 5개
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
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
            <Link href="/support" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              고객센터
            </Link>
            <ChevronRight className="text-gray-400" size={16} />
            <span className="text-gray-900 dark:text-white">1:1 문의</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            1:1 문의하기
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            궁금하신 사항을 문의해 주시면 빠르게 답변드리겠습니다
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 문의 폼 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 문의 유형 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                  >
                    <option value="">선택해주세요</option>
                    {inquiryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* 주문번호 (선택) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    주문번호 (선택)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                    placeholder="주문 관련 문의시 입력해주세요"
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                {/* 제목 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="문의 제목을 입력해주세요"
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                {/* 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="문의하실 내용을 상세히 작성해주세요"
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white resize-none"
                  />
                </div>

                {/* 첨부파일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    첨부파일 (최대 5개)
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      <Paperclip className="text-gray-400 mr-2" size={20} />
                      <span className="text-gray-600 dark:text-gray-400">파일 선택</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </label>
                    
                    {formData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 연락처 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="답변받으실 이메일"
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      휴대폰 번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end space-x-4">
                  <Link
                    href="/support"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    취소
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
                  >
                    문의 접수
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 안내 사항 */}
          <div className="space-y-6">
            {/* 빠른 연락처 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                빠른 연락처
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">전화 문의</p>
                    <p className="font-medium text-gray-900 dark:text-white">1577-1234</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">이메일</p>
                    <p className="font-medium text-gray-900 dark:text-white">support@kshop.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">카카오톡</p>
                    <p className="font-medium text-gray-900 dark:text-white">@kshop</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 운영 시간 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                운영 시간
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">평일</span>
                  <span className="text-gray-900 dark:text-white">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">점심시간</span>
                  <span className="text-gray-900 dark:text-white">12:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">주말/공휴일</span>
                  <span className="text-gray-900 dark:text-white">휴무</span>
                </div>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                유의사항
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• 문의 접수 후 24시간 이내 답변드립니다</li>
                <li>• 주말/공휴일 접수건은 영업일 기준으로 처리됩니다</li>
                <li>• 첨부파일은 10MB 이하만 가능합니다</li>
                <li>• 욕설, 비방 등 부적절한 내용은 답변이 제한될 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}