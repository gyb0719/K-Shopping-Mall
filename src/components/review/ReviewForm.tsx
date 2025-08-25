'use client'

import React, { useState } from 'react'
import { Star, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/useAuthStore'
import { useReviewStore } from '@/store/useReviewStore'
import toast from 'react-hot-toast'

interface ReviewFormProps {
  productId: string
  onClose: () => void
}

export function ReviewForm({ productId, onClose }: ReviewFormProps) {
  const { user } = useAuthStore()
  const { addReview } = useReviewStore()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('리뷰를 작성하려면 로그인이 필요합니다.')
      return
    }

    if (rating === 0) {
      toast.error('별점을 선택해주세요.')
      return
    }

    if (!title.trim() || !comment.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.')
      return
    }

    addReview(productId, {
      productId,
      userId: user.id,
      userName: user.name || user.email,
      rating,
      title,
      comment,
      verified: true,
      helpful: 0
    })

    toast.success('리뷰가 등록되었습니다.')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">리뷰 작성</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">별점</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      value <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating}점`}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="리뷰 제목을 입력하세요"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              내용
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="상품에 대한 솔직한 리뷰를 남겨주세요"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {comment.length}/500
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button type="submit" className="flex-1">
              리뷰 등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}