'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { ChatDemo } from './chat-demo'

export function Hero() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance">
          <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            Ignite Conversations
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            with GlowChat
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance">
          Leading AI chatbot platform specializing in 5-minute niche bot deployment and PIPEDA-compliant solutions for Canadian businesses
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-background hover:bg-white/90"
          >
            View our portfolio
          </Button>
          <Button 
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={scrollToPricing}
          >
            Book a call
          </Button>
        </div>

        <ChatDemo />
      </div>
    </section>
  )
}
