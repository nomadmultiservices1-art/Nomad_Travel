# Fix Production Email Issue

## Problem
The website is using simulated email sending instead of real Resend emails in production.

## Root Cause
The frontend environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not available in production, causing the email service to fall back to simulation mode.

## Solution Steps

### 1. Set Production Environment Variables in Cloudflare Pages

1. Go to your Cloudflare dashboard
2. Navigate to **Pages** → Select your project
3. Go to **Settings** → **Environment variables**
4. Add these variables for **Production**:

```
VITE_SUPABASE_URL=https://suumltnbcytuleobutca.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dW1sdG5iY3l0dWxlb2J1dGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Mzk0NjMsImV4cCI6MjA3MTExNTQ2M30.iKOCoJz5-v34MpGol2d37ZE-ZOPZ7SwmWzkWyVyz6tg
```

**Important**: Make sure to set these for the **Production** environment, not Preview.

### 2. Set Resend API Key in Supabase
Run this command to set your Resend API key:

```bash
supabase secrets set RESEND_API_KEY=your_actual_resend_api_key
```

### 3. Deploy Edge Functions
Ensure your edge functions are deployed:

```bash
supabase functions deploy send-travel-booking-email --no-verify-jwt
supabase functions deploy send-logistics-booking-email --no-verify-jwt
```

### 4. Redeploy and Test
After setting the environment variables in Cloudflare Pages:

1. **Trigger a new deployment** (push a commit or use "Retry deployment" in Cloudflare)
2. **Wait for deployment to complete**
3. **Test on your production site**:
   - Make a test booking
   - Check browser console - you should see successful API calls instead of simulation logs
   - Check your email for actual confirmation emails

### 5. Cloudflare Pages Specific Notes

- Environment variables are only applied to **new deployments**
- Changes to environment variables don't automatically redeploy - you need to trigger a new build
- You can verify the variables are loaded by temporarily adding the diagnostic script to your app

## Verification Commands

### Quick test in production browser console:
```javascript
// Run this in your production site's browser console
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
```

### Or temporarily add diagnostic to your app:
Import and call the diagnostic function in your booking component:
```javascript
import { diagnoseEmailService } from '../utils/emailDiagnostic';

// Add this temporarily in your booking form component
useEffect(() => {
  diagnoseEmailService();
}, []);
```

### Test edge function directly:
```bash
curl -X POST 'https://suumltnbcytuleobutca.supabase.co/functions/v1/send-travel-booking-email' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dW1sdG5iY3l0dWxlb2J1dGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Mzk0NjMsImV4cCI6MjA3MTExNTQ2M30.iKOCoJz5-v34MpGol2d37ZE-ZOPZ7SwmWzkWyVyz6tg' \
  -H 'Content-Type: application/json' \
  -d '{
    "bookingData": {
      "origin": "Test Origin",
      "destination": "Test Destination",
      "departure": "2024-02-15",
      "return": "2024-02-22",
      "travelers": "2",
      "class": "Economy",
      "preferences": "Test preferences",
      "customerName": "Test Customer",
      "customerEmail": "test@example.com",
      "customerPhone": "+1234567890"
    }
  }'
```