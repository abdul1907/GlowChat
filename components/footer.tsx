'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowConfetti(true)
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#00FFFF', '#8A2BE2', '#FF00FF', '#00FF00'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 0.3,
      }))
      setConfettiPieces(pieces)
      setEmail('')
      setTimeout(() => {
        setShowConfetti(false)
        setConfettiPieces([])
      }, 3000)
    }
  }

  return (
    <footer className="relative border-t border-primary/20 py-12 px-4 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GlowChat
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Building the future of customer engagement with intelligent AI chatbots for Canadian businesses.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="border-primary/30 hover:border-primary" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-primary/30 hover:border-primary" title="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy (PIPEDA)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest AI chatbot tips and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted border-primary/30 focus:border-primary"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                Join
              </Button>
            </form>
            {showConfetti && (
              <p className="text-sm text-primary mt-2 font-semibold">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 GlowChat. All rights reserved. | Built for Canadian businesses</p>
          <p className="mt-2">PIPEDA Compliant | Secure | Reliable</p>
        </div>
      </div>
    </footer>
  )
}
