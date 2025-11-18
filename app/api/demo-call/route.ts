import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { niche, phoneNumber } = body

    console.log('[v0] Initiating demo call:', { niche, phoneNumber })

    // Placeholder - replace with actual voice API integration
    // e.g., Twilio, Vonage, etc.
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      callId: `call-${Date.now()}`,
      message: `Demo call initiated to ${phoneNumber} for ${niche} niche`,
    })
  } catch (error) {
    console.error('[v0] Error initiating demo call:', error)
    return NextResponse.json(
      { error: 'Failed to initiate demo call' },
      { status: 500 }
    )
  }
}
