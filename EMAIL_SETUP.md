# Email Setup Instructions

The application currently uses EmailJS for client-side email sending. Follow these steps to set up email functionality:

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service

1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions for your provider
4. Note down your **Service ID**

## 3. Create Email Templates

Create the following templates in your EmailJS dashboard:

### Template 1: `template_travel_confirmation`
**Subject:** Travel Booking Confirmation - Nomad Travel
**Content:**
```
Dear {{to_name}},

Thank you for your travel booking request!

Booking Details:
- Route: {{route}}
- Departure: {{departure}}
- Return: {{return_date}}
- Travelers: {{travelers}}
- Class: {{travel_class}}
- Preferences: {{preferences}}

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Our team will contact you within 2 hours with a customized itinerary and pricing.

Best regards,
Nomad Travel and Multiservices
```

### Template 2: `template_travel_admin`
**Subject:** New Travel Booking Request - {{route}}
**Content:**
```
New Travel Booking Request

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Booking Details:
- Route: {{route}}
- Departure: {{departure}}
- Return: {{return_date}}
- Travelers: {{travelers}}
- Class: {{travel_class}}
- Preferences: {{preferences}}

Please contact the customer within 2 hours.
```

### Template 3: `template_logistics_confirmation`
**Subject:** Logistics Quote Request Confirmation - Nomad Travel
**Content:**
```
Dear {{to_name}},

Thank you for your logistics quote request!

Quote Details:
- Route: {{route}}
- Cargo Type: {{cargo_type}}
- Weight: {{weight}}
- Dimensions: {{dimensions}}
- Value: {{value}}
- Shipping Method: {{shipping_method}}
- Urgency: {{urgency}}
- Description: {{description}}

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Our logistics team will provide you with a detailed quote within 24 hours.

Best regards,
Nomad Travel and Multiservices
```

### Template 4: `template_logistics_admin`
**Subject:** New Logistics Quote Request - {{cargo_type}} from {{route}}
**Content:**
```
New Logistics Quote Request

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Quote Details:
- Route: {{route}}
- Cargo Type: {{cargo_type}}
- Weight: {{weight}}
- Dimensions: {{dimensions}}
- Value: {{value}}
- Shipping Method: {{shipping_method}}
- Urgency: {{urgency}}
- Description: {{description}}

Please provide a detailed quote within 24 hours.
```

## 4. Get Your Public Key

1. In EmailJS dashboard, go to "Account" > "General"
2. Copy your **Public Key**

## 5. Update Configuration

In `src/services/emailService.ts`, update the following:

```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
const USE_EMAILJS = true; // Change to true
```

## 6. Test the Setup

1. Start your development server: `npm run dev`
2. Fill out a booking form
3. Check the browser console for success messages
4. Check your email for confirmation

## Current Status

The application is currently configured to simulate email sending (emails are logged to console but not actually sent). This prevents CORS errors and allows the booking forms to work properly while you set up EmailJS.

## Troubleshooting

- **CORS Errors**: Make sure you're using EmailJS, not direct API calls
- **Template Not Found**: Ensure template IDs match exactly
- **Service Not Found**: Verify your Service ID is correct
- **Public Key Invalid**: Check your Public Key in EmailJS dashboard

For more help, visit the [EmailJS Documentation](https://www.emailjs.com/docs/).