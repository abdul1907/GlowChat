import type { Metadata } from 'next'
import { Orbitron, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-heading'
});

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'GlowChat - Premium AI Chatbots for Canadian Small Businesses',
  description: 'Ignite conversations with GlowChat. Create niche AI chatbots in 5 minutes. PIPEDA compliant, easy setup, and powerful automation for Canadian businesses.',
  keywords: ['AI chatbot', 'Canadian business', 'PIPEDA compliant', 'chatbot builder', 'automation', 'GlowChat'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${geist.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
