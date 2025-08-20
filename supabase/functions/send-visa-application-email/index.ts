import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VisaApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  passportNumber: string
  passportExpiry: string
  placeOfBirth: string
  gender: string
  maritalStatus: string
  
  // Travel Information
  destinationCountry: string
  visaType: string
  purposeOfVisit: string
  intendedArrival: string
  intendedDeparture: string
  durationOfStay: string
  previousVisits: string
  
  // Employment/Financial Information
  occupation: string
  employer: string
  monthlyIncome: string
  financialSupport: string
  
  // Accommodation
  accommodationType: string
  accommodationDetails: string
  
  // Additional Information
  criminalRecord: string
  medicalConditions: string
  additionalInfo: string
  
  // Contact Information
  customerName: string
  customerEmail: string
  customerPhone: string
  emergencyContact: string
  emergencyPhone: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicationData }: { applicationData: VisaApplicationData } = await req.json()

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
        subject: `New Visa Application - ${applicationData.firstName} ${applicationData.lastName} to ${applicationData.destinationCountry}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">New Visa Application Received</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Applicant Information</h3>
              <p><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</p>
              <p><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</p>
              <p><strong>Nationality:</strong> ${applicationData.nationality}</p>
              <p><strong>Passport Number:</strong> ${applicationData.passportNumber}</p>
              <p><strong>Passport Expiry:</strong> ${applicationData.passportExpiry}</p>
              <p><strong>Gender:</strong> ${applicationData.gender}</p>
              ${applicationData.maritalStatus ? `<p><strong>Marital Status:</strong> ${applicationData.maritalStatus}</p>` : ''}
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Travel Details</h3>
              <p><strong>Destination Country:</strong> ${applicationData.destinationCountry}</p>
              <p><strong>Visa Type:</strong> ${applicationData.visaType}</p>
              <p><strong>Purpose of Visit:</strong> ${applicationData.purposeOfVisit}</p>
              ${applicationData.intendedArrival ? `<p><strong>Intended Arrival:</strong> ${applicationData.intendedArrival}</p>` : ''}
              ${applicationData.intendedDeparture ? `<p><strong>Intended Departure:</strong> ${applicationData.intendedDeparture}</p>` : ''}
              ${applicationData.durationOfStay ? `<p><strong>Duration of Stay:</strong> ${applicationData.durationOfStay}</p>` : ''}
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Employment & Financial</h3>
              <p><strong>Occupation:</strong> ${applicationData.occupation}</p>
              ${applicationData.employer ? `<p><strong>Employer:</strong> ${applicationData.employer}</p>` : ''}
              ${applicationData.monthlyIncome ? `<p><strong>Monthly Income:</strong> ${applicationData.monthlyIncome}</p>` : ''}
              ${applicationData.financialSupport ? `<p><strong>Financial Support:</strong> ${applicationData.financialSupport}</p>` : ''}
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
              <p><strong>Contact Person:</strong> ${applicationData.customerName}</p>
              <p><strong>Email:</strong> ${applicationData.customerEmail}</p>
              <p><strong>Phone:</strong> ${applicationData.customerPhone}</p>
              ${applicationData.emergencyContact ? `<p><strong>Emergency Contact:</strong> ${applicationData.emergencyContact}</p>` : ''}
            </div>
            
            ${applicationData.additionalInfo ? `
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #92400e; margin-top: 0;">Additional Information:</h4>
              <p style="color: #92400e; margin: 0;">${applicationData.additionalInfo}</p>
            </div>
            ` : ''}
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please contact the applicant within 24 hours to begin the visa application process.</p>
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
        to: [applicationData.customerEmail],
        subject: 'Visa Application Received - Nomad Travel',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Visa Application Received!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Nomad Travel and Multiservices</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">Dear ${applicationData.customerName},</p>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">Thank you for choosing Nomad Travel for your visa application assistance! We have received your application for a ${applicationData.visaType} visa to ${applicationData.destinationCountry} and our visa specialists are reviewing your information.</p>
              
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Your Application Summary</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Applicant:</span>
                    <span style="color: #6b7280;">${applicationData.firstName} ${applicationData.lastName}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Destination:</span>
                    <span style="color: #6b7280;">${applicationData.destinationCountry}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Visa Type:</span>
                    <span style="color: #6b7280;">${applicationData.visaType}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Purpose:</span>
                    <span style="color: #6b7280;">${applicationData.purposeOfVisit}</span>
                  </div>
                  ${applicationData.intendedArrival ? `
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151;">Intended Arrival:</span>
                    <span style="color: #6b7280;">${applicationData.intendedArrival}</span>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h4>
                <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our visa specialists will review your application within 24 hours</li>
                  <li>We'll assess your visa requirements and eligibility</li>
                  <li>You'll receive a detailed checklist of required documents</li>
                  <li>We'll guide you through each step of the application process</li>
                  <li>We'll assist with embassy appointments and interview preparation</li>
                </ul>
              </div>
              
              <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">Our Visa Services Include:</h4>
                <ul style="color: #0369a1; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Visa requirement assessment</li>
                  <li>Application form completion assistance</li>
                  <li>Document preparation and verification</li>
                  <li>Embassy appointment scheduling</li>
                  <li>Interview preparation and coaching</li>
                  <li>Application status tracking</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">Need immediate assistance? Contact us:</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📧 nomad.multiservices1@gmail.com</p>
                <p style="color: #374151; font-weight: 600; margin: 5px 0;">📞 +1 (555) 123-4567</p>
              </div>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">We're committed to making your visa application process as smooth and successful as possible!</p>
              
              <p style="font-size: 16px; color: #374151; margin-top: 25px;">Best regards,<br><strong>The Nomad Travel Visa Team</strong></p>
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
        message: 'Visa application emails sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending visa application emails:', error)
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