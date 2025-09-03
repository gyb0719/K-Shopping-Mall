'use client'

import { useState } from 'react'
import { Save, Store, Globe, CreditCard, Truck, Mail, Bell, Shield, Database } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    storeName: 'K-Shop',
    storeEmail: 'support@kshop.com',
    storePhone: '1588-0000',
    storeAddress: '서울특별시 강남구 테헤란로 123',
    currency: 'KRW',
    timezone: 'Asia/Seoul',
    language: 'ko',
    freeShippingThreshold: 50000,
    taxRate: 10,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveReviews: true,
    requireEmailVerification: true,
    allow2FA: true
  })

  const handleSave = () => {
    console.log('Settings saved:', settings)
    // 실제로는 API 호출
  }

  const tabs = [
    { id: 'general', label: '일반', icon: Store },
    { id: 'payment', label: '결제', icon: CreditCard },
    { id: 'shipping', label: '배송', icon: Truck },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'security', label: '보안', icon: Shield },
    { id: 'advanced', label: '고급', icon: Database }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">설정</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          저장
        </Button>
      </div>

      <div className="flex gap-6">
        <Card className="w-64 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </Card>

        <div className="flex-1">
          {activeTab === 'general' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">일반 설정</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">스토어 이름</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">이메일</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">전화번호</label>
                  <input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">주소</label>
                  <input
                    type="text"
                    value={settings.storeAddress}
                    onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">통화</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="KRW">KRW (₩)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">시간대</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="Asia/Seoul">Asia/Seoul</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">언어</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'payment' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">결제 설정</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">세율 (%)</label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-3">결제 방법</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>신용/체크카드</span>
                      <Badge variant="default">활성</Badge>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>카카오페이</span>
                      <Badge variant="default">활성</Badge>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>네이버페이</span>
                      <Badge variant="default">활성</Badge>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>무통장입금</span>
                      <Badge variant="secondary">비활성</Badge>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'shipping' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">배송 설정</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">무료 배송 기준 금액</label>
                  <div className="flex items-center gap-2">
                    <span>₩</span>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseInt(e.target.value) })}
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">배송 업체</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>CJ대한통운</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>한진택배</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>로젠택배</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>우체국택배</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">알림 설정</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">관리자 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span>새 주문 알림</span>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>재고 부족 알림</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>새 리뷰 알림</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>환불 요청 알림</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">고객 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span>주문 확인 이메일</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>배송 추적 SMS</span>
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>프로모션 이메일</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">보안 설정</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">인증 설정</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <div>
                        <span>이메일 인증 필수</span>
                        <p className="text-sm text-muted-foreground">회원가입 시 이메일 인증 필요</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.requireEmailVerification}
                        onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <div>
                        <span>2단계 인증</span>
                        <p className="text-sm text-muted-foreground">관리자 계정 2FA 허용</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.allow2FA}
                        onChange={(e) => setSettings({ ...settings, allow2FA: e.target.checked })}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">리뷰 관리</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <div>
                        <span>자동 승인</span>
                        <p className="text-sm text-muted-foreground">5점 리뷰 자동 승인</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.autoApproveReviews}
                        onChange={(e) => setSettings({ ...settings, autoApproveReviews: e.target.checked })}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'advanced' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">고급 설정</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">유지보수 모드</h3>
                  <label className="flex items-center justify-between">
                    <div>
                      <span>유지보수 모드 활성화</span>
                      <p className="text-sm text-muted-foreground">사이트를 일시적으로 비활성화</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="rounded"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="font-medium mb-3">데이터베이스</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      데이터베이스 백업
                    </Button>
                    <Button variant="outline" className="w-full">
                      캐시 삭제
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">시스템 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">버전</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">마지막 업데이트</span>
                      <span>2025-02-01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">데이터베이스 크기</span>
                      <span>125 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}