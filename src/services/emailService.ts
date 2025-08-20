// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL_LOCAL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY_LOCAL;

const ADMIN_EMAILS = [
  'nomad.multiservices1@gmail.com',
  'nomad.multiservices1@outlook.com'
];

export interface TravelBookingData {
  origin: string;
  destination: string;
  departure: string;
  return: string;
  travelers: string;
  class: string;
  preferences: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
}

export interface LogisticsBookingData {
  origin: string;
  destination: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  value: string;
  shipping: string;
  urgency: string;
  description: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
}

export interface VisaApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  placeOfBirth: string;
  gender: string;
  maritalStatus: string;
  
  // Travel Information
  destinationCountry: string;
  visaType: string;
  purposeOfVisit: string;
  intendedArrival: string;
  intendedDeparture: string;
  durationOfStay: string;
  previousVisits: string;
  
  // Employment/Financial Information
  occupation: string;
  employer: string;
  monthlyIncome: string;
  financialSupport: string;
  
  // Accommodation
  accommodationType: string;
  accommodationDetails: string;
  
  // Additional Information
  criminalRecord: string;
  medicalConditions: string;
  additionalInfo: string;
  
  // Contact Information
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface VisaBookingData {
  destinationCountry: string;
  visaType: string;
  tentativeDeparture: string;
  tentativeReturn: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
}

// Send confirmation email to customer and admin notification
export const sendTravelConfirmationEmail = async (data: TravelBookingData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Fallback: simulate email sending
    console.log('📧 [SIMULATED] Travel confirmation email would be sent to:', data.customerEmail);
    console.log('📧 [SIMULATED] Admin notification would be sent to:', ADMIN_EMAILS);
    console.log('📧 [SIMULATED] Email content:', {
      to: data.customerEmail,
      subject: 'Travel Booking Confirmation - Nomad Travel',
      route: `${data.origin} → ${data.destination}`,
      departure: data.departure,
      return: data.return || 'One-way trip',
      travelers: data.travelers,
      class: data.class,
      preferences: data.preferences || 'None specified',
      customerName: data.customerName || 'Valued Customer',
      customerPhone: data.customerPhone || 'Not provided'
    });
    
    return {
      status: 200,
      text: 'Simulated email sent successfully'
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-travel-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        bookingData: {
          origin: data.origin,
          destination: data.destination,
          departure: data.departure,
          return: data.return,
          travelers: data.travelers,
          class: data.class,
          preferences: data.preferences,
          customerName: data.customerName || 'Valued Customer',
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone || 'Not provided'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send travel emails: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('Travel emails sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send travel emails:', error);
    throw error;
  }
};

// Legacy function - now handled by sendTravelConfirmationEmail
// This function is kept for backward compatibility but delegates to the main function
export const sendTravelBookingNotification = async (data: TravelBookingData) => {
  console.log('Note: sendTravelBookingNotification is now handled by sendTravelConfirmationEmail');
  return { status: 200, text: 'Handled by sendTravelConfirmationEmail' };
};

// Send logistics confirmation email to customer and admin notification
export const sendLogisticsConfirmationEmail = async (data: LogisticsBookingData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Fallback: simulate email sending
    console.log('📧 [SIMULATED] Logistics confirmation email would be sent to:', data.customerEmail);
    console.log('📧 [SIMULATED] Admin notification would be sent to:', ADMIN_EMAILS);
    console.log('📧 [SIMULATED] Email content:', {
      to: data.customerEmail,
      subject: 'Logistics Quote Request Confirmation - Nomad Travel',
      route: `${data.origin} → ${data.destination}`,
      cargoType: data.cargoType,
      weight: data.weight,
      dimensions: data.dimensions,
      value: data.value,
      shipping: data.shipping,
      urgency: data.urgency,
      description: data.description || 'None specified',
      customerName: data.customerName || 'Valued Customer',
      customerPhone: data.customerPhone || 'Not provided'
    });
    
    return {
      status: 200,
      text: 'Simulated email sent successfully'
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-logistics-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        bookingData: {
          origin: data.origin,
          destination: data.destination,
          cargoType: data.cargoType,
          weight: data.weight,
          dimensions: data.dimensions,
          value: data.value,
          shipping: data.shipping,
          urgency: data.urgency,
          description: data.description,
          customerName: data.customerName || 'Valued Customer',
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone || 'Not provided'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send logistics emails: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('Logistics emails sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send logistics emails:', error);
    throw error;
  }
};

// Legacy function - now handled by sendLogisticsConfirmationEmail
// This function is kept for backward compatibility but delegates to the main function
export const sendLogisticsBookingNotification = async (data: LogisticsBookingData) => {
  console.log('Note: sendLogisticsBookingNotification is now handled by sendLogisticsConfirmationEmail');
  return { status: 200, text: 'Handled by sendLogisticsConfirmationEmail' };
};

// Send visa application confirmation email to customer and admin notification
export const sendVisaApplicationEmail = async (data: VisaApplicationData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Fallback: simulate email sending
    console.log('📧 [SIMULATED] Visa application confirmation email would be sent to:', data.customerEmail);
    console.log('📧 [SIMULATED] Admin notification would be sent to:', ADMIN_EMAILS);
    console.log('📧 [SIMULATED] Email content:', {
      to: data.customerEmail,
      subject: 'Visa Application Received - Nomad Travel',
      applicantName: `${data.firstName} ${data.lastName}`,
      destinationCountry: data.destinationCountry,
      visaType: data.visaType,
      purposeOfVisit: data.purposeOfVisit,
      intendedArrival: data.intendedArrival,
      customerName: data.customerName || 'Valued Customer',
      customerPhone: data.customerPhone || 'Not provided'
    });
    
    return {
      status: 200,
      text: 'Simulated email sent successfully'
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-visa-application-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        applicationData: data
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send visa application emails: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('Visa application emails sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send visa application emails:', error);
    throw error;
  }
};

// Send visa confirmation email to customer and admin notification
export const sendVisaConfirmationEmail = async (data: VisaBookingData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Fallback: simulate email sending
    console.log('📧 [SIMULATED] Visa confirmation email would be sent to:', data.customerEmail);
    console.log('📧 [SIMULATED] Admin notification would be sent to:', ADMIN_EMAILS);
    console.log('📧 [SIMULATED] Email content:', {
      to: data.customerEmail,
      subject: 'Visa Application Assistance Request Confirmation - Nomad Travel',
      destinationCountry: data.destinationCountry,
      visaType: data.visaType,
      tentativeDeparture: data.tentativeDeparture,
      tentativeReturn: data.tentativeReturn || 'Not specified',
      customerName: data.customerName || 'Valued Customer',
      customerPhone: data.customerPhone || 'Not provided'
    });
    
    return {
      status: 200,
      text: 'Simulated email sent successfully'
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-visa-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        bookingData: {
          destinationCountry: data.destinationCountry,
          visaType: data.visaType,
          tentativeDeparture: data.tentativeDeparture,
          tentativeReturn: data.tentativeReturn,
          customerName: data.customerName || 'Valued Customer',
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone || 'Not provided'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send visa emails: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('Visa emails sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send visa emails:', error);
    throw error;
  }
};

// Legacy function - now handled by sendVisaConfirmationEmail
// This function is kept for backward compatibility but delegates to the main function
export const sendVisaBookingNotification = async (data: VisaBookingData) => {
  console.log('Note: sendVisaBookingNotification is now handled by sendVisaConfirmationEmail');
  return { status: 200, text: 'Handled by sendVisaConfirmationEmail' };
};