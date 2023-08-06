import NewMemoryForm from '@/src/components/NewMemoryForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="text-sm flex items-center gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4">Voltar à timeline</ChevronLeft>
      </Link>
      <NewMemoryForm />
    </div>
  )
}
