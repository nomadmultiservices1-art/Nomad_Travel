import emailjs from '@emailjs/browser';

// EmailJS configuration - Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_nomad_travel';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const USE_EMAILJS = false; // Set to true when EmailJS is properly configured

const ADMIN_EMAILS = [
  'nomad.multiservices1@gmail.com',
  'nomad.multiservices1@outlook.com'
];

// Initialize EmailJS only if configured
if (USE_EMAILJS && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

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

// Send confirmation email to customer
export const sendTravelConfirmationEmail = async (data: TravelBookingData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  // If EmailJS is not configured, simulate email sending
  if (!USE_EMAILJS) {
    console.log('EmailJS not configured. Simulating email send to:', data.customerEmail);
    console.log('Travel booking details:', {
      route: `${data.origin} → ${data.destination}`,
      departure: data.departure,
      return: data.return,
      travelers: data.travelers,
      class: data.class
    });
    return { status: 200, text: 'Email simulated successfully' };
  }

  const templateParams = {
    to_email: data.customerEmail,
    to_name: data.customerName || 'Valued Customer',
    from_name: 'Nomad Travel and Multiservices',
    subject: 'Travel Booking Confirmation - Nomad Travel',
    route: `${data.origin} → ${data.destination}`,
    departure: data.departure,
    return_date: data.return || 'One-way',
    travelers: data.travelers,
    travel_class: data.class,
    preferences: data.preferences || 'None specified',
    customer_name: data.customerName || '',
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone || 'Not provided'
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_travel_confirmation',
      templateParams
    );

    console.log('Travel confirmation email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error(`Failed to send confirmation email: ${error}`);
  }
};

// Send booking notification to admins
export const sendTravelBookingNotification = async (data: TravelBookingData) => {
  // If EmailJS is not configured, simulate email sending
  if (!USE_EMAILJS) {
    console.log('EmailJS not configured. Simulating admin notification to:', ADMIN_EMAILS);
    console.log('New travel booking from:', data.customerEmail);
    return { status: 200, text: 'Admin notification simulated successfully' };
  }

  const templateParams = {
    to_email: ADMIN_EMAILS.join(','),
    from_name: 'Nomad Travel Booking System',
    subject: `New Travel Booking Request - ${data.origin} to ${data.destination}`,
    route: `${data.origin} → ${data.destination}`,
    departure: data.departure,
    return_date: data.return || 'One-way',
    travelers: data.travelers,
    travel_class: data.class,
    preferences: data.preferences || 'None specified',
    customer_name: data.customerName || 'Not provided',
    customer_email: data.customerEmail || 'Not provided',
    customer_phone: data.customerPhone || 'Not provided'
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_travel_admin',
      templateParams
    );

    console.log('Travel admin notification sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw new Error(`Failed to send admin notification: ${error}`);
  }
};

// Send logistics confirmation email to customer
export const sendLogisticsConfirmationEmail = async (data: LogisticsBookingData) => {
  if (!data.customerEmail) {
    throw new Error('Customer email is required');
  }

  // If EmailJS is not configured, simulate email sending
  if (!USE_EMAILJS) {
    console.log('EmailJS not configured. Simulating logistics email send to:', data.customerEmail);
    console.log('Logistics quote details:', {
      route: `${data.origin} → ${data.destination}`,
      cargoType: data.cargoType,
      weight: data.weight,
      shipping: data.shipping
    });
    return { status: 200, text: 'Logistics email simulated successfully' };
  }

  const templateParams = {
    to_email: data.customerEmail,
    to_name: data.customerName || 'Valued Customer',
    from_name: 'Nomad Travel and Multiservices',
    subject: 'Logistics Quote Request Confirmation - Nomad Travel',
    route: `${data.origin} → ${data.destination}`,
    cargo_type: data.cargoType,
    weight: data.weight,
    dimensions: data.dimensions,
    value: data.value,
    shipping_method: data.shipping,
    urgency: data.urgency,
    description: data.description || 'None specified',
    customer_name: data.customerName || '',
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone || 'Not provided'
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_logistics_confirmation',
      templateParams
    );

    console.log('Logistics confirmation email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error(`Failed to send confirmation email: ${error}`);
  }
};

// Send logistics notification to admins
export const sendLogisticsBookingNotification = async (data: LogisticsBookingData) => {
  // If EmailJS is not configured, simulate email sending
  if (!USE_EMAILJS) {
    console.log('EmailJS not configured. Simulating logistics admin notification to:', ADMIN_EMAILS);
    console.log('New logistics quote from:', data.customerEmail);
    return { status: 200, text: 'Logistics admin notification simulated successfully' };
  }

  const templateParams = {
    to_email: ADMIN_EMAILS.join(','),
    from_name: 'Nomad Travel Logistics System',
    subject: `New Logistics Quote Request - ${data.cargoType} from ${data.origin} to ${data.destination}`,
    route: `${data.origin} → ${data.destination}`,
    cargo_type: data.cargoType,
    weight: data.weight,
    dimensions: data.dimensions,
    value: data.value,
    shipping_method: data.shipping,
    urgency: data.urgency,
    description: data.description || 'None specified',
    customer_name: data.customerName || 'Not provided',
    customer_email: data.customerEmail || 'Not provided',
    customer_phone: data.customerPhone || 'Not provided'
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_logistics_admin',
      templateParams
    );

    console.log('Logistics admin notification sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw new Error(`Failed to send admin notification: ${error}`);
  }
};