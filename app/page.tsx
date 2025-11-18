import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { DashboardPreview } from '@/components/dashboard-preview'
import { Footer } from '@/components/footer'
import { ParticleBackground } from '@/components/particle-background'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Features />
        <Pricing />
        <DashboardPreview />
        <Footer />
      </div>
    </main>
  )
}
