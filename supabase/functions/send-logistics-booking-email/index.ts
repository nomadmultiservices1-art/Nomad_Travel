import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LogisticsBookingData {
  origin: string
  destination: string
  cargoType: string
  weight: string
  dimensions: string
  value: string
  shipping: string
  urgency: string
  description: string
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
    const { bookingData }: { bookingData: LogisticsBookingData } = await req.json()

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
        subject: `New Logistics Quote Request - ${bookingData.cargoType} from ${bookingData.origin} to ${bookingData.destination}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #059669; padding-bottom: 10px;">New Logistics Quote Request</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${bookingData.customerName}</p>
              <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
              <p><strong>Phone:</strong> ${bookingData.customerPhone}</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Logistics Details</h3>
              <p><strong>Route:</strong> ${bookingData.origin} → ${bookingData.destination}</p>
              <p><strong>Cargo Type:</strong> ${bookingData.cargoType}</p>
              <p><strong>Weight:</strong> ${bookingData.weight}</p>
              <p><strong>Dimensions:</strong> ${bookingData.dimensions}</p>
              <p><strong>Cargo Value:</strong> ${bookingData.value}</p>
              <p><strong>Shipping Method:</strong> ${bookingData.shipping}</p>
              <p><strong>Urgency Level:</strong> ${bookingData.urgency}</p>
              ${bookingData.description ? `<p><strong>Additional Details:</strong> ${bookingData.description}</p>` : ''}
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please provide a detailed quote within 24 hours.</p>
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
        subject: 'Logistics Quote Request Confirmation - Nomad Travel',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Quote Request Received!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Nomad Travel and Multiservices</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">Dear ${bookingData.customerName},</p>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">Thank you for choosing Nomad Travel for your logistics needs! We have received your quote request and our logistics team is reviewing your requirements to provide you with the best shipping solution.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Your Quote Request Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Route:</span>
                    <span style="color: #6b7280;">${bookingData.origin} → ${bookingData.destination}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Cargo Type:</span>
                    <span style="color: #6b7280;">${bookingData.cargoType}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Weight:</span>
                    <span style="color: #6b7280;">${bookingData.weight}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Dimensions:</span>
                    <span style="color: #6b7280;">${bookingData.dimensions}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Cargo Value:</span>
                    <span style="color: #6b7280;">${bookingData.value}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Shipping Method:</span>
                    <span style="color: #6b7280;">${bookingData.shipping}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Urgency Level:</span>
                    <span style="color: #6b7280;">${bookingData.urgency}</span>
                  </div>
                  ${bookingData.description ? `
                  <div style="padding: 8px 0;">
                    <span style="font-weight: 600; color: #374151;">Additional Details:</span>
                    <p style="color: #6b7280; margin: 5px 0 0 0;">${bookingData.description}</p>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h4>
                <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our logistics experts will analyze your shipping requirements</li>
                  <li>We'll calculate the most cost-effective and efficient shipping options</li>
                  <li>You'll receive a detailed quote within 24 hours</li>
                  <li>We'll coordinate all aspects of your shipment once approved</li>
                </ul>
              </div>
              
              <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">Our Services Include:</h4>
                <ul style="color: #0369a1; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Door-to-door delivery</li>
                  <li>Customs clearance assistance</li>
                  <li>Cargo insurance options</li>
                  <li>Real-time tracking</li>
                  <li>Professional packaging and handling</li>
                  <li>Complete documentation support</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">Need immediate assistance? Contact us:</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📧 nomad.multiservices1@gmail.com</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📞 +1 (555) 123-4567</p>
              </div>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">We're committed to providing you with reliable, efficient, and cost-effective logistics solutions!</p>
              
              <p style="font-size: 16px; color: #374151; margin-top: 25px;">Best regards,<br><strong>The Nomad Travel Logistics Team</strong></p>
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