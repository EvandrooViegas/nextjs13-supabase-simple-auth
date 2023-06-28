import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req:NextRequest) {

  /* Create the supabase middleware client from the response and the request  */
  /* Note: The middleware was ran after the `/auth/callback`, so if the user is logged in the supabase instance is up to date  */
  /* Get the user from the supabase session  */
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  // check if the user is not logged in and the req.pathname is equal to "/" if it is reqdirect to the login page
  if(req.nextUrl.pathname === "/" && !user) {
    return NextResponse.redirect(new URL("/login", req.url))
    
  } 
  // check if the user is  logged in and the req.pathname is equal to "/login" if it is reqdirect to the auth page
  else if(req.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", req.url))
  } else {
    return NextResponse.next()
  }
}