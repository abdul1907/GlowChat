'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, Phone, Copy, Check, Loader2, X } from 'lucide-react'
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
import { useToast } from '@/hooks/use-toast'
import { fetchTemplates, createBot, createDemoCall } from '@/lib/api'

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
    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push('/')
      toast({
        title: 'Authentication required',
        description: 'Please log in to access the dashboard',
        variant: 'destructive',
      })
    } else {
      setIsAuthenticated(true)
      loadTemplates()
    }
    setIsLoading(false)
  }, [router])

  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates()
      setTemplates(data)
    } catch (error) {
      toast({
        title: 'Error loading templates',
        description: 'Could not fetch niche templates',
        variant: 'destructive',
      })
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

  const embedCode = `<script src="https://glowchat.ai/widget.js"></script>
<script>
  GlowChat.init({ 
    botId: 'gc-${selectedNiche}-${Date.now()}',
    niche: '${selectedNiche}'
  });
</script>`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
    toast({
      title: 'Code copied!',
      description: 'Embed code copied to clipboard',
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
        title: 'Bot created successfully!',
        description: `Your ${selectedNiche} bot is now live`,
      })
      
      // Copy to clipboard automatically
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
        title: 'Demo call initiated!',
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
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[2000px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="relative bg-primary/20 border-2 border-primary rounded-full p-2 hover:scale-110 transition-transform">
                <div className="w-8 h-8 flex items-center justify-center text-xl font-bold text-primary glow-text">
                  GC
                </div>
                {/* Sparks */}
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
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GlowChat
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-sm text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <motion.aside 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 border-r border-border bg-card/30 backdrop-blur-lg p-6 overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Niche Templates
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <Label className="mb-2 block">Select Template</Label>
              <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="e-commerce">E-Commerce</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2 text-sm">Template Info</h3>
              <p className="text-xs text-muted-foreground">
                {selectedNiche === 'e-commerce' && 'Cart recovery, product recommendations, order tracking'}
                {selectedNiche === 'real-estate' && 'Property search, viewing bookings, lead qualification'}
                {selectedNiche === 'education' && 'Course info, enrollment, student support'}
              </p>
            </Card>
          </div>

          <div className="space-y-3">
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
            
            <Button 
              variant="outline"
              className="w-full border-primary/50"
              onClick={() => setShowDemoModal(true)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Demo Voice Call
            </Button>
          </div>
        </motion.aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-background">
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

        <motion.aside 
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="w-96 border-l border-border bg-card/30 backdrop-blur-lg p-6 overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Embed Code
          </h2>

          <div className="space-y-4">
            <Card className="p-4 bg-muted/30">
              <pre className="text-xs overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
            </Card>

            <Button 
              className="w-full"
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
                  <SelectItem value="e-commerce">E-Commerce</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
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
