import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
  import Button from '../components/button'
  import SigninBtn from '../components/signinButton'
  import ContinueBtn from '../components/continueBtn'
  import Link from 'next/link'


export default function Home() {
  return (
  <ClerkProvider>
   <div id='stars'></div>
  <div id='stars2'></div>
  <div id='stars3'></div>

    <div className="flex flex-col justify-center items-center h-screen">
        <h1>Priorities. Plans. Planets</h1>
        <p className="text-[#e0e0e0]">Float through your day with a to-do app that keeps everything aligned.</p>
        <div className="flex flex-col">
          <SignedOut>
            <SignUpButton>
              <Button />
            </SignUpButton>
            <SignInButton>
              <SigninBtn />
            </SignInButton>
          </SignedOut>

          <SignedIn>
             <ContinueBtn />
          </SignedIn>
        </div>
    </div>
    
  </ClerkProvider>
  );
}