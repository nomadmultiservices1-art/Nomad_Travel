import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TravelBookingData {
  origin: string
  destination: string
  departure: string
  return: string
  travelers: string
  class: string
  preferences: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { bookingData }: { bookingData: TravelBookingData } = await req.json()

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Send admin notification email
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nomad Travel <ntl@booking.nomadtl.com>',
        to: ['nomad.multiservices1@gmail.com', 'nomad.multiservices1@outlook.com'],
        subject: `New Travel Booking Request - ${bookingData.origin} to ${bookingData.destination}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Travel Booking Request</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${bookingData.customerName}</p>
              <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
              <p><strong>Phone:</strong> ${bookingData.customerPhone}</p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Travel Details</h3>
              <p><strong>Route:</strong> ${bookingData.origin} → ${bookingData.destination}</p>
              <p><strong>Departure Date:</strong> ${bookingData.departure}</p>
              <p><strong>Return Date:</strong> ${bookingData.return || 'One-way trip'}</p>
              <p><strong>Number of Travelers:</strong> ${bookingData.travelers}</p>
              <p><strong>Travel Class:</strong> ${bookingData.class}</p>
              ${bookingData.preferences ? `<p><strong>Special Preferences:</strong> ${bookingData.preferences}</p>` : ''}
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please contact the customer within 2 hours with a customized itinerary and pricing.</p>
            </div>
          </div>
        `,
      }),
    })

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text()
      throw new Error(`Failed to send admin email: ${errorText}`)
    }

    // Send customer confirmation email
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nomad Travel <ntl@booking.nomadtl.com>',
        to: [bookingData.customerEmail],
        subject: 'Travel Booking Confirmation - Nomad Travel',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Thank You for Your Booking!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Nomad Travel and Multiservices</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">Dear ${bookingData.customerName},</p>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">Thank you for choosing Nomad Travel for your upcoming journey! We have received your travel booking request and our team is already working on creating the perfect itinerary for you.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Your Booking Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Route:</span>
                    <span style="color: #6b7280;">${bookingData.origin} → ${bookingData.destination}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Departure:</span>
                    <span style="color: #6b7280;">${bookingData.departure}</span>
                  </div>
                  ${bookingData.return ? `
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Return:</span>
                    <span style="color: #6b7280;">${bookingData.return}</span>
                  </div>
                  ` : ''}
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Travelers:</span>
                    <span style="color: #6b7280;">${bookingData.travelers}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Class:</span>
                    <span style="color: #6b7280;">${bookingData.class}</span>
                  </div>
                  ${bookingData.preferences ? `
                  <div style="padding: 8px 0;">
                    <span style="font-weight: 600; color: #374151;">Special Preferences:</span>
                    <p style="color: #6b7280; margin: 5px 0 0 0;">${bookingData.preferences}</p>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h4>
                <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our travel experts will review your requirements</li>
                  <li>We'll create a customized itinerary with the best options</li>
                  <li>You'll receive a detailed proposal within 2 hours</li>
                  <li>We'll work with you to finalize all details</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">Need immediate assistance? Contact us:</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📧 nomad.multiservices1@gmail.com</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📞 +1 (555) 123-4567</p>
              </div>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">We're excited to help you create unforgettable memories on your journey!</p>
              
              <p style="font-size: 16px; color: #374151; margin-top: 25px;">Best regards,<br><strong>The Nomad Travel Team</strong></p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">© 2024 Nomad Travel and Multiservices. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    })

    if (!customerEmailResponse.ok) {
      const errorText = await customerEmailResponse.text()
      throw new Error(`Failed to send customer email: ${errorText}`)
    }

    const adminResult = await adminEmailResponse.json()
    const customerResult = await customerEmailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailId: adminResult.id,
        customerEmailId: customerResult.id,
        message: 'Emails sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending emails:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})