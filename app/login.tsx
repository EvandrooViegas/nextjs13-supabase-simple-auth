"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();

  // create a client supabase client instance
  const supabase = createClientComponentClient();
  // saving email in a state
  const [email, setEmail] = React.useState("")

  /* function to sign up the user:
    - the user writes the email
    - the function is called 
    - email, password is send along to the supabase
    - supabase sends a email to the email passed
    - user opens the email and click the verfication link
    - the verfication link lead back to the website
    - the emailRedirectTo option is used to redirect get the user code and set it to a session on the server
    - the middleware is called, and garantees that the user is authenticated
    - if it is the user is sent to the home page
  */
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password: "sup3rs3cur3",
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });
    // router refresh is used to refresh the route so the middleware is called
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password: "sup3rs3cur3",
    });
    // router refresh is used to refresh the route so the middleware is called
    router.refresh();
  };

  const handleSignOut = async () => {
    // the auth cookie is removed
    await supabase.auth.signOut();
    // router refresh is used to refresh the route so the middleware is called
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <input type="email" className="text-black" onChange={(e) => setEmail(e.target.value)} />  
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}