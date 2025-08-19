# Supabase Edge Functions Setup

This project uses Supabase Edge Functions to handle email notifications for travel and logistics bookings using Resend.

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Resend Account**: Create an account at [resend.com](https://resend.com)
3. **Supabase CLI**: Install the Supabase CLI

## Setup Instructions

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Initialize Supabase Project

```bash
supabase init
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### 3. Environment Variables

Create a `.env.local` file based on `.env.local.example`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-api-key
```

### 4. Deploy Edge Functions

```bash
# Deploy travel booking email function
supabase functions deploy send-travel-booking-email --no-verify-jwt

# Deploy logistics booking email function
supabase functions deploy send-logistics-booking-email --no-verify-jwt
```

### 5. Set Secrets

Set the Resend API key as a secret:

```bash
supabase secrets set RESEND_API_KEY=your-resend-api-key
```

## Edge Functions

### Travel Booking Email Function

**Endpoint**: `https://your-project.supabase.co/functions/v1/send-travel-booking-email`

**Purpose**: Sends two emails when a travel booking is made:
1. Admin notification to `nomad.multiservices1@gmail.com` and `nomad.multiservices1@outlook.com`
2. Confirmation email to the customer

**Payload**:
```json
{
  "origin": "string",
  "destination": "string",
  "departureDate": "string",
  "returnDate": "string",
  "passengers": "number",
  "travelClass": "string",
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "string"
}
```

### Logistics Booking Email Function

**Endpoint**: `https://your-project.supabase.co/functions/v1/send-logistics-booking-email`

**Purpose**: Sends two emails when a logistics booking is made:
1. Admin notification to `nomad.multiservices1@gmail.com` and `nomad.multiservices1@outlook.com`
2. Confirmation email to the customer

**Payload**:
```json
{
  "origin": "string",
  "destination": "string",
  "cargoType": "string",
  "weight": "string",
  "dimensions": "string",
  "value": "string",
  "shipping": "string",
  "urgency": "string",
  "description": "string",
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "string"
}
```

## Testing

### Local Development

1. Start Supabase locally:
```bash
supabase start
```

2. Serve functions locally:
```bash
supabase functions serve
```

3. Test the functions:
```bash
# Test travel booking email
curl -X POST 'http://localhost:54321/functions/v1/send-travel-booking-email' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "origin": "New York",
    "destination": "London",
    "departureDate": "2024-02-15",
    "returnDate": "2024-02-22",
    "passengers": 2,
    "travelClass": "Economy",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890"
  }'

# Test logistics booking email
curl -X POST 'http://localhost:54321/functions/v1/send-logistics-booking-email' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "origin": "New York",
    "destination": "Los Angeles",
    "cargoType": "Electronics",
    "weight": "50kg",
    "dimensions": "100x50x30cm",
    "value": "$5000",
    "shipping": "Express",
    "urgency": "High",
    "description": "Fragile electronics",
    "customerName": "Jane Smith",
    "customerEmail": "jane@example.com",
    "customerPhone": "+1987654321"
  }'
```

## Troubleshooting

### Common Issues

1. **Function not found**: Make sure you've deployed the functions and they're accessible
2. **Email not sending**: Check that your Resend API key is correctly set as a secret
3. **CORS errors**: The functions include CORS headers, but make sure your frontend URL is allowed
4. **Authentication errors**: The functions are deployed with `--no-verify-jwt` for easier integration

### Logs

View function logs:
```bash
supabase functions logs send-travel-booking-email
supabase functions logs send-logistics-booking-email
```

## Integration with Frontend

The email service in `src/services/emailService.ts` automatically calls these Edge Functions when Supabase is configured. If Supabase is not configured, it falls back to simulated email sending for development.

## Security Notes

- Never commit your `.env.local` file
- Keep your Resend API key secure
- The functions validate input data before sending emails
- Admin email addresses are hardcoded in the functions for security