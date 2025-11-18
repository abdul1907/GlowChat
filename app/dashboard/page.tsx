'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Phone, LogOut } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedNiche, setSelectedNiche] = useState('ecom')
  const [prompt, setPrompt] = useState('Hi, recover cart? 10% off!')
  const [lang, setLang] = useState('en')
  const [phone, setPhone] = useState('')
  const [copied, setCopied] = useState(false)

  // Simple hardcoded niches list
  const niches = [
    { value: 'ecom', label: 'E-commerce', example: 'Hi, recover cart? 10% off!' },
    { value: 'realestate', label: 'Real Estate', example: 'Budget? Location prefs?' },
    { value: 'healthcare', label: 'Healthcare', example: 'Symptom check? Book appt?' },
    { value: 'education', label: 'Education', example: 'Course info? Enrollment?' },
    { value: 'retail', label: 'Retail', example: 'Product availability? Store hours?' },
    { value: 'fitness', label: 'Fitness/Gyms', example: 'Class schedule? Membership?' },
    { value: 'travel', label: 'Travel', example: 'Trip planning? Booking?' },
    { value: 'beauty', label: 'Beauty/Salons', example: 'Service booking? Pricing?' },
    { value: 'fashion', label: 'Fashion', example: 'Style recommendations? Sizing?' },
    { value: 'pharma', label: 'Pharma', example: 'Medication info? Reminders?' },
  ]

  // Simple language texts
  const langTexts = {
    en: {
      dashboard: 'Dashboard',
      niche: 'Select Niche',
      prompt: 'Edit Prompt',
      demo: 'Demo Call',
      embed: 'Embed Code',
      copy: 'Copy',
      copied: 'Copied!',
      logout: 'Logout',
      startCall: 'Start Call',
      phonePlaceholder: 'Phone +1-xxx-xxx-xxxx',
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      niche: 'श्रेणी चुनें',
      prompt: 'प्रॉम्प्ट संपादित करें',
      demo: 'डेमो कॉल',
      embed: 'एम्बेड कोड',
      copy: 'कॉपी',
      copied: 'कॉपी हो गया!',
      logout: 'लॉगआउट',
      startCall: 'कॉल शुरू करें',
      phonePlaceholder: 'फोन +1-xxx-xxx-xxxx',
    },
  }

  const t = langTexts[lang as keyof typeof langTexts]

  const handleNicheChange = (value: string) => {
    setSelectedNiche(value)
    const niche = niches.find(n => n.value === value)
    if (niche) {
      setPrompt(niche.example)
    }
  }

  const copyEmbed = () => {
    const code = `<script src="https://glowchat.com/widget.js?niche=${selectedNiche}&lang=${lang}"></script>\n<div id="glowchat"></div>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: t.copied,
      description: 'Paste on your site',
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    router.push('/')
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    })
  }

  const handleDemoCall = () => {
    if (!phone) {
      toast({
        title: 'Phone required',
        description: 'Please enter phone number',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Call initiated!',
      description: `Demo call started for ${selectedNiche} at ${phone}`,
    })
  }

  const embedCode = `<script src="https://glowchat.com/widget.js?niche=${selectedNiche}&lang=${lang}"></script>\n<div id="glowchat"></div>`

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            GlowChat
          </div>
          <span className="text-lg text-gray-400">/ {t.dashboard}</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-[100px] bg-purple-900/50 border-cyan-500/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 EN</SelectItem>
              <SelectItem value="hi">🇮🇳 HI</SelectItem>
            </SelectContent>
          </Select>

          {/* Logout Button */}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            {t.logout}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Niche Select */}
        <Card className="md:w-1/4 bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">{t.niche}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedNiche} onValueChange={handleNicheChange}>
              <SelectTrigger className="bg-gray-800 border-cyan-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {niches.map(n => (
                  <SelectItem key={n.value} value={n.value}>
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Center: Prompt Textarea */}
        <Card className="md:flex-1 bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">{t.prompt}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              className="resize-none bg-gray-800 border-cyan-500/50 text-white"
              placeholder="Enter your bot prompt here..."
            />
          </CardContent>
        </Card>

        {/* Right: Embed Code */}
        <Card className="md:w-1/4 bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">{t.embed}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              readOnly
              value={embedCode}
              rows={4}
              className="w-full p-2 bg-gray-800 rounded border-cyan-500/50 text-xs font-mono text-gray-300 resize-none"
            />
            <Button
              onClick={copyEmbed}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? t.copied : t.copy}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom: Demo Call */}
      <div className="mt-8 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg">
              <Phone className="h-5 w-5 mr-2" />
              {t.demo}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-cyan-500/50">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">{t.demo}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">{t.niche}</label>
                <Select value={selectedNiche} onValueChange={handleNicheChange}>
                  <SelectTrigger className="bg-gray-800 border-cyan-500/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map(n => (
                      <SelectItem key={n.value} value={n.value}>
                        {n.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-800 border-cyan-500/50"
                />
              </div>

              <Button
                onClick={handleDemoCall}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                {t.startCall}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
