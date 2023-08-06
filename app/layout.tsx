import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJure,
} from 'next/font/google'
import { ReactNode } from 'react'
import { Hero } from '@/src/components/Hero'
import { Profile } from '@/src/components/Profile'
import { SignButon } from '@/src/components/SignButon'
import { cookies } from 'next/headers'
import { Copyright } from '@/src/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamJuree = BaiJamJure({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamJuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="bg-cover relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url('../src/assets/bg-stars.svg')] px-28 py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
            {/* Sign In */}
            {isAuthenticated ? <Profile /> : <SignButon />}
            {/* Hero */}
            <Hero />
            {/* Copyright */}
            <Copyright />
          </div>

          {/* Right */}
          <div className="bg-cover flex max-h-screen flex-col overflow-y-scroll bg-[url('../src/assets/bg-stars.svg')] ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
