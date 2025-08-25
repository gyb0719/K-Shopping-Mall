'use client'

import { Truck, Shield, CreditCard, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Truck,
    title: '무료 배송',
    description: '5만원 이상 구매 시 무료배송',
  },
  {
    icon: Shield,
    title: '안전한 쇼핑',
    description: '100% 정품 보증 및 안전 결제',
  },
  {
    icon: CreditCard,
    title: '간편 결제',
    description: '다양한 결제 수단 지원',
  },
  {
    icon: Headphones,
    title: '24/7 고객지원',
    description: '언제든 문의 가능한 고객센터',
  },
]

export function FeatureSection() {
  return (
    <section className="py-12 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}