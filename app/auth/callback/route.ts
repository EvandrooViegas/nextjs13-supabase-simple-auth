import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request:NextRequest) {

  /* get the request URL and grab the code from it */  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  /* if there is a code (token / cookie) then supabase is going to set the user from it */  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  /* Return to the origin */  
  return NextResponse.redirect(requestUrl.origin)
}