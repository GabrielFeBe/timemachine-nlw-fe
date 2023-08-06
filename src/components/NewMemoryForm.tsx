'use client'
import { Camera } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { api } from '../lib/api'
import { MediaPicker } from './MediaPicker'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'

export default function NewMemoryForm() {
  const [startDate, setStartDate] = useState(new Date())
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const createdAt = dayjs(startDate).format()
    const fileToUpload = formData.get('coverUrl')
    let coverUrl = ''
    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)
      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')
    await api.post(
      '/memories',
      {
        createdAt,
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    router.push('/')
  }
  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-start">
        <span className="text-sm w-60 leading-snug text-gray-200">
          Data da memória
        </span>
        <DatePicker
          className="text-sm border-0 bg-gray-900 text-gray-200"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showTimeSelect
          name="datePicker"
        />
      </div>
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="text-sm flex cursor-pointer items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4"></Camera>
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="text-sm flex items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="text-lg w-full flex-1 resize-none rounded border-0 bg-transparent p-0 leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="text-sm inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
