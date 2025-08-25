import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { ProductSection } from '@/components/home/ProductSection'
import { FeatureSection } from '@/components/home/FeatureSection'
import { sampleProducts } from '@/data/sampleProducts'

export default function Home() {
  // Filter products for different sections
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 5)
  const saleProducts = sampleProducts.filter(p => p.sale_price).slice(0, 5)
  const newProducts = sampleProducts.slice(-5).reverse()

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <ProductSection
        title="인기 상품"
        subtitle="고객님들이 가장 많이 찾는 상품"
        products={featuredProducts}
        viewAllLink="/products?sort=popular"
      />
      <CategorySection />
      <ProductSection
        title="특가 상품"
        subtitle="놓치면 후회하는 할인 상품"
        products={saleProducts}
        viewAllLink="/deals"
      />
      <ProductSection
        title="신상품"
        subtitle="새로 입고된 최신 상품"
        products={newProducts}
        viewAllLink="/products?sort=newest"
      />
    </>
  );
}
