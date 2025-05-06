
'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Scene from '@/public/Scene.svg'
 
export default function LoginForm() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/homepage')
    } else {
      // Handle errors
    }
}
 
  return (

    <div className="container flex flex-col max-w-fit mx-auto justify-center">
      <h1 className='text-center pt-20'>Sign In.</h1>
      <Image src={Scene} alt='rocket' width={500} height={500}/>
      <form onSubmit={handleSubmit} 
      className='flex flex-col justify-center items-center gap-y-4' >
        <input type="email" name="email" placeholder="Email" required className='border-2 border-[#3E1671] rounded-lg px-5 text-[#d6d6d6] text-lg font-semibold w-[381px] h-[61px]' />
        <input type="password" name="password" placeholder="Password" required className='border-2 border-[#3E1671] rounded-lg px-5 text-[#d6d6d6] text-lg font-semibold w-[381px] h-[61px]'/>
        <button type="submit" className='mt-5 border-2 border-[#3E1671] rounded-lg px-5 text-[#d6d6d6] text-[22px] font-semibold w-[381px] h-[63px] bg-linear-to-bl from-violet-500 to-fuchsia-500'>Login</button>
      </form>
    </div>
  )
}