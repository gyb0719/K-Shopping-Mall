'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const slides = [
  {
    id: 1,
    title: '최신 전자제품',
    subtitle: '최대 40% 할인',
    description: '인기 브랜드 제품을 특별 가격으로 만나보세요',
    image: 'https://picsum.photos/1920/600?random=201',
    link: '/category/electronics',
    buttonText: '지금 쇼핑하기',
  },
  {
    id: 2,
    title: '2025 S/S 컬렉션',
    subtitle: '신상품 입고',
    description: '트렌디한 패션 아이템으로 스타일을 완성하세요',
    image: 'https://picsum.photos/1920/600?random=202',
    link: '/category/fashion',
    buttonText: '컬렉션 보기',
  },
  {
    id: 3,
    title: '홈 인테리어 세일',
    subtitle: '봄맞이 특별전',
    description: '집을 더 아름답고 편안하게 만들어보세요',
    image: 'https://picsum.photos/1920/600?random=203',
    link: '/category/home-living',
    buttonText: '둘러보기',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-xl text-white"
            >
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                {slides[currentSlide].subtitle}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slides[currentSlide].description}
              </p>
              <Button size="lg" asChild>
                <Link href={slides[currentSlide].link}>
                  {slides[currentSlide].buttonText}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}