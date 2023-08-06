import { api } from '@/src/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowLeft, Edit } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

dayjs.locale(ptBr)

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default async function specificPage({
  params,
}: {
  params: { specificmemory: string }
}) {
  const token = cookies().get('token')?.value

  let memory: Memory | null
  try {
    const response = await api.get(`/memories/${params.specificmemory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    memory = response.data
  } catch (err) {
    memory = null
  }
  console.log(memory)
  if (!memory) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4" key={memory.id}>
        <time className="text-sm -ml-8 flex items-center gap-2  text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <Image
          src={memory.coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm flex items-center gap-2 text-gray-200 hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar a todas às memórias
          </Link>
          <Link
            className="text-sm flex items-center gap-2 text-gray-200 hover:text-gray-100"
            href={`/memories/${params.specificmemory}/editing`}
          >
            <Edit className="h-4 w-4" />
            Editar
          </Link>
        </div>
      </div>
    </div>
  )
}
