'use client'

import { ShoppingBag, Play, Zap, Headphones } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: ShoppingBag,
    title: 'Niche-Optimized Templates',
    description: 'Pre-built templates for e-commerce cart recovery, real estate lead generation, healthcare appointments, and more. Launch in minutes.',
    demo: 'See Demo',
  },
  {
    icon: Play,
    title: 'Voice Demo Calls by Niche',
    description: 'Try AI-powered voice demos tailored to your industry. Experience realistic conversations for e-com, real estate, and more before you commit.',
    demo: 'Try Voice Demo',
  },
  {
    icon: Zap,
    title: '99.99% Uptime Guarantee',
    description: 'Industry-leading reliability with real-time monitoring. Your bot is always available when your customers need it most.',
    demo: 'See Demo',
  },
  {
    icon: Headphones,
    title: 'Pro Support',
    description: '24/7 expert support with zero issues guarantee. Dedicated account managers for enterprise plans. We\'re here to help you succeed.',
    demo: 'See Demo',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Everything You Need to Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help Canadian businesses automate and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  demo,
  index 
}: { 
  icon: any
  title: string
  description: string
  demo: string
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group bg-card/50 backdrop-blur-lg border border-primary/20 rounded-xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full group-hover:bg-primary/40 transition-all" />
        <div className="relative bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>
      
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/50 hover:border-primary hover:bg-primary/10"
      >
        {demo}
      </Button>
    </div>
  )
}
