'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: Math.round(49 * 12 * 0.85),
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 5,000 conversations/month',
      '3 chatbots',
      'Niche-optimized templates',
      'Email support',
      'PIPEDA compliant',
      'Basic analytics',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: Math.round(99 * 12 * 0.85),
    description: 'For growing businesses with higher volume',
    features: [
      'Up to 25,000 conversations/month',
      '10 chatbots',
      'All premium templates',
      'Priority support',
      'Voice & chat embed',
      'Custom branding',
      'Advanced analytics dashboard',
      'A/B testing',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    monthlyPrice: 199,
    annualPrice: Math.round(199 * 12 * 0.85),
    description: 'Enterprise-grade features and support',
    features: [
      'Unlimited conversations',
      'Unlimited chatbots',
      'White-label solution',
      '24/7 phone support',
      'Dedicated account manager',
      'Custom integrations',
      'Custom ML training',
      '99.99% SLA guarantee',
    ],
  },
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            No hidden fees. Cancel anytime. Scale as you grow.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <Label htmlFor="billing-toggle" className={!isAnnual ? 'text-foreground' : 'text-muted-foreground'}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? 'text-foreground' : 'text-muted-foreground'}>
              Annual <span className="text-primary">(Save 15%)</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-card/50 backdrop-blur-lg border rounded-xl p-8 transition-all duration-500 hover:scale-105 pricing-card-glow ${
                plan.popular
                  ? 'border-primary shadow-2xl shadow-primary/20 md:scale-105 md:-translate-y-4'
                  : 'border-primary/20'
              } ${idx === 2 ? 'md:translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 animate-pulse-glow' 
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
                size="lg"
              >
                {plan.popular ? `Start GlowChat Trial $${plan.monthlyPrice}` : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-card/30 backdrop-blur-lg border border-primary/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Why Choose GlowChat?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$49</div>
              <div className="text-sm font-semibold mb-1">GlowChat</div>
              <div className="text-xs text-muted-foreground">Easy setup, PIPEDA compliant</div>
              <div className="text-xs text-success mt-2">vs. Competitors: $79+ Complex</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5 Min</div>
              <div className="text-sm font-semibold mb-1">Setup Time</div>
              <div className="text-xs text-muted-foreground">Deploy in minutes</div>
              <div className="text-xs text-success mt-2">vs. 30+ min competitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-sm font-semibold mb-1">Uptime SLA</div>
              <div className="text-xs text-muted-foreground">Industry-leading</div>
              <div className="text-xs text-success mt-2">Zero downtime issues</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
