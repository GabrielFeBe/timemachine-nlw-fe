'use client'
import { api } from '@/src/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Camera } from 'lucide-react'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Cookies from 'js-cookie'
import { MediaPicker } from '@/src/components/MediaPicker'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

dayjs.locale(ptBr)

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default function EditingPage({
  params,
}: {
  params: { specificmemory: string }
}) {
  const router = useRouter()
  const [coverUrl, setCoverUrl] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [id, setID] = useState<string>('')
  const [startDate, setStartDate] = useState(new Date())

  const token = Cookies.get('token')
  async function acessingCurrentMemory() {
    const response = await api.get(`/memories/${params.specificmemory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const memory: Memory = response.data
    setContent(memory.content)
    setCoverUrl(memory.coverUrl)
    setIsPublic(memory.isPublic)
    setID(memory.id)
  }
  useEffect(() => {
    acessingCurrentMemory()
  }, [])

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('coverUrl')
    let coverUrli = coverUrl
    const dateTime = dayjs(startDate).format()

    if (fileToUpload && fileToUpload instanceof Blob) {
      const { size } = fileToUpload
      if (size > 0) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrli = uploadResponse.data.fileUrl
      }
    }
    const token = Cookies.get('token')
    await api.put(
      `/memories/${id}`,
      {
        createdAt: dateTime,
        coverUrl: coverUrli,
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
    router.refresh()
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])
    setCoverUrl(previewURL)
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
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        accept="image/*"
        className="invisible  h-0 w-0"
        name="coverUrl"
      />

      {coverUrl.length > 0 ? (
        // eslint-disable-next-line
        <img
          src={coverUrl}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        <MediaPicker />
      )}
      <textarea
        name="content"
        spellCheck={false}
        value={content}
        onChange={({ target }) => setContent(target.value)}
        className="text-lg w-full flex-1 resize-none rounded border-0 bg-transparent p-0 leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="text-sm inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar Edição
      </button>
    </form>
  )
}
