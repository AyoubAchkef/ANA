import HeroStatsTransition from '@/components/HeroStatsTransition'
import Features from '@/components/Features'
import HorizontalScroll from '@/components/HorizontalScroll'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-black">
      <HeroStatsTransition />
      <Features />
      <HorizontalScroll />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
