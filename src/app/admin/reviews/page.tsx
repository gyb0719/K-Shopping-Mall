'use client'

import { useState, useEffect } from 'react'
import { Star, ThumbsUp, MessageSquare, AlertCircle, Check, X, MoreVertical } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Review {
  id: string
  productName: string
  productImage: string
  customerName: string
  customerEmail: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  status: 'pending' | 'approved' | 'rejected'
  verified: boolean
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')

  useEffect(() => {
    // 더미 데이터
    const dummyReviews: Review[] = [
      {
        id: '1',
        productName: '무선 이어폰 프로 Max',
        productImage: '/api/placeholder/60/60',
        customerName: '김민수',
        customerEmail: 'kim@example.com',
        rating: 5,
        title: '정말 만족스러운 제품입니다!',
        content: '음질이 정말 좋고 노이즈 캔슬링 기능이 훌륭합니다. 배터리도 오래가서 하루종일 사용해도 문제없어요.',
        date: '2025-02-01',
        helpful: 23,
        status: 'approved',
        verified: true
      },
      {
        id: '2',
        productName: '스마트워치 Ultra',
        productImage: '/api/placeholder/60/60',
        customerName: '이수진',
        customerEmail: 'lee@example.com',
        rating: 4,
        title: '대체로 만족합니다',
        content: '기능이 다양하고 디자인도 예쁩니다. 다만 배터리가 생각보다 빨리 닳는 것 같아요.',
        date: '2025-01-30',
        helpful: 15,
        status: 'approved',
        verified: true
      },
      {
        id: '3',
        productName: '노트북 스탠드 프리미엄',
        productImage: '/api/placeholder/60/60',
        customerName: '박지현',
        customerEmail: 'park@example.com',
        rating: 3,
        title: '무난한 제품',
        content: '가격대비 괜찮은 편이지만 각도 조절이 조금 뻑뻑합니다.',
        date: '2025-01-28',
        helpful: 8,
        status: 'pending',
        verified: false
      },
      {
        id: '4',
        productName: '무선 충전기 3in1',
        productImage: '/api/placeholder/60/60',
        customerName: '최영호',
        customerEmail: 'choi@example.com',
        rating: 2,
        title: '기대에 못 미칩니다',
        content: '충전 속도가 너무 느리고 발열이 심합니다. 개선이 필요할 것 같아요.',
        date: '2025-01-25',
        helpful: 3,
        status: 'pending',
        verified: false
      },
      {
        id: '5',
        productName: 'USB-C 허브 7포트',
        productImage: '/api/placeholder/60/60',
        customerName: '정미경',
        customerEmail: 'jung@example.com',
        rating: 5,
        title: '완벽한 확장성!',
        content: '포트가 많아서 정말 편리합니다. 발열도 적고 전송 속도도 빠릅니다.',
        date: '2025-01-20',
        helpful: 31,
        status: 'approved',
        verified: true
      }
    ]
    setReviews(dummyReviews)
  }, [])

  const filteredReviews = reviews.filter(review => {
    const statusMatch = filterStatus === 'all' || review.status === filterStatus
    const ratingMatch = filterRating === 'all' || review.rating === parseInt(filterRating)
    return statusMatch && ratingMatch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'approved': return 'default'
      case 'pending': return 'secondary'
      case 'rejected': return 'destructive'
      default: return 'outline'
    }
  }

  const handleApprove = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'approved' as const } : r
    ))
  }

  const handleReject = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">리뷰 관리</h1>
        <Button variant="outline">리뷰 정책 설정</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">전체 리뷰</p>
            <p className="text-2xl font-bold">{reviews.length}</p>
            <p className="text-xs text-green-600">+24 이번 주</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">평균 평점</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </p>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-green-600">+0.2 지난달 대비</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">대기 중</p>
            <p className="text-2xl font-bold">{reviews.filter(r => r.status === 'pending').length}</p>
            <p className="text-xs text-orange-600">검토 필요</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">승인률</p>
            <p className="text-2xl font-bold">
              {Math.round((reviews.filter(r => r.status === 'approved').length / reviews.length) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">자동 승인 포함</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">모든 상태</option>
              <option value="pending">대기 중</option>
              <option value="approved">승인됨</option>
              <option value="rejected">거부됨</option>
            </select>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">모든 평점</option>
              <option value="5">5점</option>
              <option value="4">4점</option>
              <option value="3">3점</option>
              <option value="2">2점</option>
              <option value="1">1점</option>
            </select>
          </div>
        </div>

        <div className="divide-y">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-muted/50">
              <div className="flex gap-4">
                <img 
                  src={review.productImage} 
                  alt={review.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.productName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          {review.customerName} • {review.date}
                        </span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs">
                            구매 인증
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(review.status)}>
                        {review.status === 'approved' ? '승인됨' : 
                         review.status === 'pending' ? '대기 중' : '거부됨'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{review.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful}명이 도움됨</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        답글
                      </Button>
                    </div>
                    
                    {review.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApprove(review.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          승인
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(review.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          거부
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}