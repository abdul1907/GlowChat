'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  LogOut, Phone, Copy, Check, Loader2, X, 
  ShoppingBag, Home, Activity, BookOpen, Megaphone, 
  Scale, Store, Hotel, DollarSign, Users, Dumbbell, 
  Car, MapPin, Heart, Code, Utensils, Sparkles, 
  Hammer, Tv, Truck, Leaf, Factory, Zap, Lightbulb, 
  Gamepad, Shirt, Pill, PhoneCall, Building2, Globe
} from 'lucide-react'
import Link from 'next/link'
import ReactFlow, { 
  Background, 
  Controls,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useToast } from '@/hooks/use-toast'
import { fetchTemplates, createBot, createDemoCall } from '@/lib/api'
import { cn } from '@/lib/utils'

// 30+ Global Niches with Icons and Prompts
const NICHE_TEMPLATES = [
  { id: 'e-commerce', name: 'E-Commerce', icon: ShoppingBag, prompt: 'Cart recovery bot', desc: 'Cart recovery, product recommendations, order tracking' },
  { id: 'real-estate', name: 'Real Estate', icon: Home, prompt: 'Lead qualification', desc: 'Property search, viewing bookings, lead qualification' },
  { id: 'healthcare', name: 'Healthcare', icon: Activity, prompt: 'Appointment reminders', desc: 'Appointment scheduling, patient queries, health tips' },
  { id: 'education', name: 'Education', icon: BookOpen, prompt: 'Student queries', desc: 'Course info, enrollment, student support' },
  { id: 'marketing', name: 'Marketing Agencies', icon: Megaphone, prompt: 'Content ideas', desc: 'Campaign ideas, content suggestions, strategy planning' },
  { id: 'legal', name: 'Legal Firms', icon: Scale, prompt: 'Contract Q&A', desc: 'Legal queries, document assistance, consultation booking' },
  { id: 'retail', name: 'Retail', icon: Store, prompt: 'Inventory check', desc: 'Product availability, store hours, promotions' },
  { id: 'hospitality', name: 'Hospitality', icon: Hotel, prompt: 'Reservation bot', desc: 'Room booking, amenities info, check-in assistance' },
  { id: 'finance', name: 'Finance Advisors', icon: DollarSign, prompt: 'Basic advice—non-banking', desc: 'Financial planning, investment tips, consultation' },
  { id: 'hr', name: 'HR/Recruiting', icon: Users, prompt: 'Job matching', desc: 'Job listings, application status, interview scheduling' },
  { id: 'fitness', name: 'Fitness/Gyms', icon: Dumbbell, prompt: 'Workout plans', desc: 'Class schedules, membership info, fitness tips' },
  { id: 'automotive', name: 'Automotive', icon: Car, prompt: 'Service quotes', desc: 'Service booking, parts availability, maintenance tips' },
  { id: 'travel', name: 'Travel Agencies', icon: MapPin, prompt: 'Itinerary planning', desc: 'Trip planning, booking assistance, travel tips' },
  { id: 'nonprofit', name: 'Non-Profits', icon: Heart, prompt: 'Donor engagement', desc: 'Donation info, volunteer signup, event details' },
  { id: 'saas', name: 'SaaS/Tech', icon: Code, prompt: 'Support tickets', desc: 'Technical support, feature requests, bug reports' },
  { id: 'food', name: 'Food Delivery', icon: Utensils, prompt: 'Order tracking', desc: 'Order placement, tracking, menu recommendations' },
  { id: 'beauty', name: 'Beauty/Salons', icon: Sparkles, prompt: 'Appointment booking', desc: 'Service booking, pricing, availability' },
  { id: 'construction', name: 'Construction', icon: Hammer, prompt: 'Quote requests', desc: 'Project quotes, scheduling, material info' },
  { id: 'media', name: 'Media/Entertainment', icon: Tv, prompt: 'Ticket sales', desc: 'Event tickets, showtimes, venue info' },
  { id: 'logistics', name: 'Logistics/Shipping', icon: Truck, prompt: 'Delivery scheduling', desc: 'Shipment tracking, delivery scheduling, rates' },
  { id: 'agriculture', name: 'Agriculture', icon: Leaf, prompt: 'Crop advice', desc: 'Farming tips, weather info, crop management' },
  { id: 'manufacturing', name: 'Manufacturing', icon: Factory, prompt: 'Order status', desc: 'Order tracking, production updates, inventory' },
  { id: 'energy', name: 'Energy/Utilities', icon: Zap, prompt: 'Billing queries', desc: 'Bill inquiries, service requests, outage reports' },
  { id: 'consulting', name: 'Consulting', icon: Lightbulb, prompt: 'Session booking', desc: 'Consultation booking, service info, expertise areas' },
  { id: 'gaming', name: 'Gaming/Esports', icon: Gamepad, prompt: 'Player support', desc: 'Game support, tournament info, community help' },
  { id: 'fashion', name: 'Fashion', icon: Shirt, prompt: 'Style recs', desc: 'Style recommendations, sizing, trend updates' },
  { id: 'pharma', name: 'Pharma', icon: Pill, prompt: 'Med reminders', desc: 'Medication info, reminders, health tips' },
  { id: 'telecom', name: 'Telecom', icon: PhoneCall, prompt: 'Plan queries', desc: 'Plan information, billing, technical support' },
  { id: 'government', name: 'Government/Local Services', icon: Building2, prompt: 'Info forms', desc: 'Service information, form assistance, office hours' },
]

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Welcome Message' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'User Query Handler' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Response Generator' },
    position: { x: 250, y: 200 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState(false)
  const [selectedNiche, setSelectedNiche] = useState('e-commerce')
  const [locale, setLocale] = useState('en')
  const [templates, setTemplates] = useState<any[]>([])
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoNiche, setDemoNiche] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds))
  }

  useEffect(() => {
    // Temporarily allow access for testing - remove this in production
    const token = localStorage.getItem('auth_token')
    if (!token) {
      // Set a temporary token for testing
      localStorage.setItem('auth_token', 'temp_test_token')
    }
    setIsAuthenticated(true)
    loadTemplates()
    setIsLoading(false)
  }, [])

  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates()
      setTemplates(data)
    } catch (error) {
      // Silently fail - use local templates
      console.log('Using local templates')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    router.push('/')
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    })
  }

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId)
    const niche = NICHE_TEMPLATES.find(n => n.id === nicheId)
    if (niche) {
      // Update nodes with niche-specific prompt
      setNodes([
        {
          id: '1',
          type: 'input',
          data: { label: `Welcome: Hi, ${niche.prompt}?` },
          position: { x: 250, y: 5 },
        },
        {
          id: '2',
          data: { label: `Query: ${niche.prompt}` },
          position: { x: 250, y: 100 },
        },
        {
          id: '3',
          data: { label: 'Response Generator' },
          position: { x: 250, y: 200 },
        },
      ])
    }
  }

  const embedCode = `<script src="https://glowchat.com/widget.js?botId=gc-${selectedNiche}-${Date.now()}&locale=${locale}&niche=${selectedNiche}"></script>
<div id="glowchat"></div>`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
    toast({
      title: 'Embed Copied!',
      description: 'Paste on site',
    })
  }

  const handleGenerateBot = async () => {
    setIsSubmitting(true)
    try {
      const botData = await createBot({
        niche: selectedNiche,
        nodes: nodes,
        edges: edges,
      })
      
      toast({
        title: 'Bot Saved!',
        description: `Your ${selectedNiche} bot is now live`,
      })
      
      handleCopyCode()
    } catch (error) {
      toast({
        title: 'Error creating bot',
        description: 'Please try again',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoCall = async () => {
    if (!demoNiche || !phoneNumber) {
      toast({
        title: 'Missing information',
        description: 'Please select a niche and enter phone number',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createDemoCall({
        niche: demoNiche,
        phoneNumber: phoneNumber,
      })
      
      toast({
        title: 'Call Initiated!',
        description: `You'll receive a call at ${phoneNumber} in a moment`,
      })
      
      setShowDemoModal(false)
      setDemoNiche('')
      setPhoneNumber('')
    } catch (error) {
      toast({
        title: 'Error initiating call',
        description: 'Please try again',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedNicheData = NICHE_TEMPLATES.find(n => n.id === selectedNiche)
  const currentLanguage = LANGUAGES.find(l => l.code === locale)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-black/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[2000px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="relative bg-primary/20 border-2 border-primary rounded-full p-2 hover:scale-110 transition-transform">
                <div className="w-8 h-8 flex items-center justify-center text-xl font-bold text-primary glow-text">
                  GC
                </div>
                <div className="absolute inset-0 animate-spark-1">
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full spark" />
                </div>
                <div className="absolute inset-0 animate-spark-2">
                  <div className="absolute top-1/2 right-0 w-1 h-1 bg-secondary rounded-full spark" />
                </div>
                <div className="absolute inset-0 animate-spark-3">
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full spark" />
                </div>
                <div className="absolute inset-0 animate-spark-4">
                  <div className="absolute top-1/2 left-0 w-1 h-1 bg-secondary rounded-full spark" />
                </div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading">
              GlowChat
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger className="w-[140px] border-primary/50">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue>
                    {currentLanguage?.flag} {currentLanguage?.name}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-12 h-[calc(100vh-73px)]">
        {/* Left Sidebar - Niches */}
        <motion.aside 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="md:col-span-3 border-r border-border bg-black/80 backdrop-blur-lg rounded-r-lg p-4 overflow-y-auto h-[calc(100vh-80px)] sticky top-20"
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading">
            Global Niches
          </h2>
          
          <Accordion type="multiple" defaultValue={['all']} className="w-full">
            <AccordionItem value="all">
              <AccordionTrigger>All Niches</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {NICHE_TEMPLATES.map((niche) => {
                    const Icon = niche.icon
                    return (
                      <motion.div
                        key={niche.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className={cn(
                            "p-4 m-2 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]",
                            selectedNiche === niche.id && "border-primary bg-primary/10"
                          )}
                          onClick={() => handleNicheSelect(niche.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{niche.name}</h3>
                              <p className="text-xs text-muted-foreground">{niche.prompt}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={handleGenerateBot}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Generate Bot'
              )}
            </Button>
          </div>
        </motion.aside>

        {/* Center Canvas - React Flow */}
        <main className="md:col-span-6 flex flex-col" role="main">
          <div className="flex-1 bg-background p-8 min-h-[80vh]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              className="bg-background"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </main>

        {/* Right Panel - Embed Code */}
        <motion.aside 
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="md:col-span-3 border-l border-border bg-black/80 backdrop-blur-lg rounded-l-lg p-4 overflow-y-auto h-[calc(100vh-80px)] sticky top-20"
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading">
            Embed Code
          </h2>

          <div className="space-y-4">
            <Card className="p-4 bg-muted/30">
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                <code>{embedCode}</code>
              </pre>
            </Card>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleCopyCode}
              variant={copiedCode ? 'default' : 'outline'}
            >
              {copiedCode ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>

            <Button 
              className="w-full"
              onClick={handleGenerateBot}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Bot'
              )}
            </Button>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Bots</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Chats</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Response</span>
                  <span className="font-semibold">1.2s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Bottom Bar - Demo Call */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-900 to-purple-900 p-4 flex justify-center z-40">
        <Button 
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          onClick={() => setShowDemoModal(true)}
        >
          <Phone className="h-5 w-5 mr-2" />
          Demo Voice Call
        </Button>
      </div>

      {/* Demo Call Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Voice Call</DialogTitle>
            <DialogDescription>
              Experience GlowChat AI voice assistant for your selected niche
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Select Niche</Label>
              <Select value={demoNiche} onValueChange={setDemoNiche}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHE_TEMPLATES.map((niche) => (
                    <SelectItem key={niche.id} value={niche.id}>
                      {niche.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Language</Label>
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Phone Number</Label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={handleDemoCall}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Initiating Call...
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-2" />
                  Start Demo Call
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
