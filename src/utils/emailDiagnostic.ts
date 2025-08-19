// Temporary diagnostic utility to check email service configuration
// Add this to your production build temporarily to diagnose the issue

export const diagnoseEmailService = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL_LOCAL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY_LOCAL;
  
  console.log('🔍 Email Service Diagnostic:');
  console.log('Environment:', import.meta.env.MODE);
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ SET' : '❌ NOT SET');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ SET' : '❌ NOT SET');
  
  if (supabaseUrl) {
    console.log('Supabase URL:', supabaseUrl);
  }
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('⚠️  Email service will use SIMULATION mode');
    console.log('💡 Fix: Set environment variables in your deployment platform');
  } else {
    console.log('✅ Email service should use REAL Supabase edge functions');
  }
  
  return {
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseAnonKey: !!supabaseAnonKey,
    willUseRealEmails: !!(supabaseUrl && supabaseAnonKey)
  };
};