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

export default function Home() {
  return (
  <ClerkProvider>

    <div className="flex flex-col justify-center items-center h-screen">
        <h1>Priorities. Plans. Planets</h1>
        <p className="text-[#e0e0e0]">Float through your day with a to-do app that keeps everything aligned.</p>
        <div className="flex flex-col">
          <SignedOut>
          <SignUpButton>
            <Button/>              
          </SignUpButton>
          </SignedOut> 
          <SignInButton>
            <SigninBtn />
          </SignInButton>
        </div>
    </div>
    
  </ClerkProvider>
  );
}