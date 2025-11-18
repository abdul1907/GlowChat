import { NextResponse } from 'next/server'

export async function GET() {
  // Placeholder data - replace with actual database query
  const templates = [
    {
      id: 'e-commerce',
      name: 'E-Commerce',
      description: 'Cart recovery, product recommendations, order tracking',
      features: ['Cart abandonment', 'Product search', 'Order status'],
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Property search, viewing bookings, lead qualification',
      features: ['Property listings', 'Schedule viewings', 'Lead capture'],
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Course info, enrollment, student support',
      features: ['Course catalog', 'Enrollment help', 'Student queries'],
    },
  ]

  return NextResponse.json(templates)
}
