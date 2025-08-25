'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { ReviewStats as ReviewStatsType } from '@/types/review'

interface ReviewStatsProps {
  stats: ReviewStatsType
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const maxCount = Math.max(...Object.values(stats.distribution))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{stats.average.toFixed(1)}</div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(stats.average)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {stats.total}개 리뷰
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-3">{rating}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{
                    width: `${
                      maxCount > 0
                        ? (stats.distribution[rating as keyof typeof stats.distribution] / maxCount) * 100
                        : 0
                    }%`
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right">
                {stats.distribution[rating as keyof typeof stats.distribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}