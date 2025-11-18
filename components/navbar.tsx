'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { scrollY } = useScroll()
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '85%'])
  const navPadding = useTransform(scrollY, [0, 100], ['1.5rem', '0.75rem'])
  const navHeight = useTransform(scrollY, [0, 100], ['64px', '52px'])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      style={{
        width: navWidth,
        height: navHeight,
        paddingLeft: navPadding,
        paddingRight: navPadding,
      }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/98 backdrop-blur-2xl border border-primary/30 rounded-full shadow-2xl shadow-primary/20'
          : 'bg-background/95 backdrop-blur-2xl border border-border/30 rounded-full shadow-lg'
      }`}
    >
      <div className="h-full grid grid-cols-3 items-center">
        {/* Left section - Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative bg-primary/20 border-2 border-primary rounded-full p-1.5">
                <div className="w-7 h-7 flex items-center justify-center text-sm font-bold text-primary glow-text">
                  GC
                </div>
                {/* Sparks animation */}
                <motion.div
                  className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full spark"
                  animate={{
                    y: [-20, -30, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-1/2 right-0 w-1 h-1 bg-secondary rounded-full spark"
                  animate={{
                    x: [20, 30, 20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full spark"
                  animate={{
                    y: [20, 30, 20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-0 w-1 h-1 bg-secondary rounded-full spark"
                  animate={{
                    x: [-20, -30, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
              </div>
            </motion.div>
            <span className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GlowChat
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center space-x-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#features" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Features
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/#pricing" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-end">
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" className="bg-white text-background hover:bg-white/90 font-medium text-sm px-6 py-2 h-10 rounded-full">
                Get a quote
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-card border-t border-border mt-2 rounded-xl"
        >
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/#features" className="block text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="block text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="block text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Button className="w-full bg-white text-background hover:bg-white/90">
              Get a quote
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
