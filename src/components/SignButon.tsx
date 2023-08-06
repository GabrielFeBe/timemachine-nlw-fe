import React from 'react'
import { User } from 'lucide-react'

export function SignButon() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="flex h-5 w-5 text-gray-500" />
      </div>
      <p className="text-sm max-w-[140px] leading-snug">
        <span className="underline ">Crie sua conta</span> e salve suas
        memórias!
      </p>
    </a>
  )
}
