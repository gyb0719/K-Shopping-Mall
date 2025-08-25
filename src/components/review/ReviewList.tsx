'use client'

import React from 'react'
import { Star, ThumbsUp, CheckCircle } from 'lucide-react'
import { Review } from '@/types/review'
import { Button } from '@/components/ui/Button'
import { formatDistanceToNow } from '@/lib/utils'

interface ReviewListProps {
  reviews: Review[]
  onMarkHelpful: (reviewId: string) => void
}

export function ReviewList({ reviews, onMarkHelpful }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">아직 리뷰가 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-1">
          첫 번째 리뷰를 작성해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{review.userName}</span>
                {review.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    <span className="text-xs">구매 인증</span>
                  </div>
                )}
                <span>·</span>
                <span>
                  {formatDistanceToNow(new Date(review.createdAt))} 전
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {review.comment}
          </p>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`리뷰 이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkHelpful(review.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              도움이 됐어요 ({review.helpful})
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}