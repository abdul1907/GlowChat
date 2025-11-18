'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Send } from 'lucide-react'

export function ChatDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: 'Hi! I\'m your AI assistant. How can I help you today?', isBot: true }
  ])
  const [input, setInput] = useState('')

  const responses = [
    'I can help you book an appointment! What time works best for you?',
    'Great question! Let me look that up for you.',
    'I\'m here 24/7 to assist with your needs.',
    'Would you like to speak with a human agent?',
  ]

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages(prev => [...prev, { text: input, isBot: false }])
    setInput('')
    
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { text: response, isBot: true }])
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto">
      {!isOpen ? (
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Try Live Demo
        </Button>
      ) : (
        <div className="bg-card/80 backdrop-blur-lg border border-primary/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-primary/10 border-b border-primary/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">GlowChat AI Demo</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              Close
            </Button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-primary/30 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 outline-none focus:border-primary"
            />
            <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
