import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client using public environment variables.  When
 * deployed on Vercel you should set NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY in the project’s Environment Variables.
 *
 * If either variable is missing the client will still be created but
 * requests will fail.  The app gracefully falls back to the static
 * dataset when Supabase requests fail.
 */
export const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    // Return a dummy client that will throw on request
    return null as any
  }
  return createClient(url, key)
})()