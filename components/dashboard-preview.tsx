'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Code, Eye, Settings, Bot } from 'lucide-react'

export function DashboardPreview() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Powerful Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Drag, drop, and deploy. Building AI bots has never been easier.
          </p>
        </div>

        <div className="relative bg-card/50 backdrop-blur-lg border border-primary/20 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 bg-muted/30 border-r border-primary/20 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                GlowChat Templates
              </h3>
              <div className="space-y-2">
                {['E-Com', 'Real Estate', 'Education', 'Services', 'Retail'].map((template) => (
                  <div
                    key={template}
                    className="px-3 py-2 rounded-lg bg-background/50 hover:bg-primary/10 cursor-pointer transition-colors text-sm"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 p-6 min-h-[400px]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold">Bot Builder Canvas</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Welcome Message', 'User Intent Detection', 'Response Flow', 'Integration Setup'].map((step, idx) => (
                  <div
                    key={step}
                    className="bg-muted/30 border border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-move"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-2 text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="text-sm font-semibold">{step}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button onClick={() => setShowModal(true)} className="bg-primary hover:bg-primary/90">
                  <Code className="h-4 w-4 mr-2" />
                  Get Embed Code
                </Button>
              </div>
            </div>

            <div className="md:w-64 bg-muted/30 border-l border-primary/20 p-6">
              <h3 className="font-bold mb-4">Embed Code</h3>
              <div className="bg-background/50 rounded-lg p-4 font-mono text-xs text-muted-foreground overflow-x-auto">
                {'<script src="glowchat.ai"'}
                <br />
                {'  data-bot="your-bot-id"'}
                <br />
                {'></script>'}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Copy and paste this code into your website to activate your bot.
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-primary rounded-xl p-8 max-w-2xl w-full">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Interactive Canvas
              </h3>
              <p className="text-muted-foreground mb-6">
                This is a preview of the drag-and-drop bot builder. Create complex conversation flows with an intuitive visual interface.
              </p>
              <div className="bg-muted/30 border border-primary/20 rounded-lg p-8 text-center mb-6">
                <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Full interactive canvas available after sign up
                </p>
              </div>
              <Button onClick={() => setShowModal(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
