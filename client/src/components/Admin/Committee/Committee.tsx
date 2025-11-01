'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, Image as ImageIcon, Video, Users, ExternalLink, Save, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TextEditor from '@/components/Admin/components/TextEditor'
import adminApiService from '@/shared/api/admin.api.service'
import type { ICommittee } from "../../../../../package/types/models/committee"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminCommittee() {
  const router = useRouter()
  const [committees, setCommittees] = useState<ICommittee[]>([])
  const [selectedCommittee, setSelectedCommittee] = useState<ICommittee | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participants, setParticipants] = useState<string[]>([])
  const [editorHtml, setEditorHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/committee?page=1&limit=1000",
        method: "get"
      })
      setCommittees(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки комитетов:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<ICommittee>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: "/api/committee",
        method: "post",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка создания комитета:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<ICommittee>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: `/api/committee/${id}`,
        method: "put",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления комитета:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({
        path: `/api/committee/${id}`,
        method: "delete"
      })
      setCommittees(committees.filter(item => item._id !== id))
      if (selectedCommittee?._id === id) {
        setSelectedCommittee(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления комитета:', error)
    }
  }

  const handleSave = async (html?: string) => {
    try {
      setSaving(true)
      const contentHtml = html || editorHtml

      const committeeData: Partial<ICommittee> = {
        title,
        description,
        participant: participants,
        html: contentHtml,
        media: {
          imagesUrl: images,
          videoUrl: videos
        },
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(committeeData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedCommittee(result.data)
        }
      } else if (selectedCommittee) {
        result = await handleUpdate(selectedCommittee._id, committeeData)
        setIsEditing(false)
      }

      await handleFind()
      return result
    } catch (error) {
      console.error('Ошибка сохранения:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  const handleEditorSave = async (html: string) => {
    setEditorHtml(html)
  }

  const handleEdit = (committee: ICommittee) => {
    setSelectedCommittee(committee)
    setTitle(committee.title || '')
    setDescription(committee.description || '')
    setParticipants(committee.participant || [])
    setEditorHtml(committee.html || '')
    setImages(committee.media?.imagesUrl || [])
    setVideos(committee.media?.videoUrl || [])
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedCommittee(null)
    setTitle('')
    setDescription('')
    setParticipants([])
    setEditorHtml('')
    setImages([])
    setVideos([])
  }

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
    setIsCreating(false)
  }

  const handleViewCommittee = (committeeId: string) => {
    router.push(`/committees/${committeeId}`)
  }

  useEffect(() => {
    handleFind()
  }, [])

  if (isEditing || isCreating) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к списку
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Left Column - Form and Media */}
            <div className="xl:col-span-3 space-y-4 sm:space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Основная информация
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название комитета *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm sm:text-base"
                        placeholder="Введите название комитета"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Краткое описание *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all resize-none text-sm sm:text-base"
                        placeholder="Краткое описание комитета"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Manager */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Медиафайлы
                </h2>
                <NewsMediaManager
                  handleSave={(images: string[], videos: string[]) => {
                    setImages(images)
                    setVideos(videos)
                  }}
                  viewImg={true}
                  viewVideo={true}
                  initialImages={images}
                  initialVideos={videos}
                />
              </div>

              {/* Text Editor */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Детальное описание
                </h2>
                <TextEditor
                  html={selectedCommittee?.html || ''}
                  onSave={handleEditorSave}
                />
              </div>
            </div>

            {/* Right Column - Save Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isCreating ? 'Создание комитета' : 'Редактирование комитета'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCreating
                        ? 'Заполните все необходимые поля для создания комитета'
                        : 'Внесите изменения в комитет'
                      }
                    </p>
                  </div>

                  {/* Validation Status */}
                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${title ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={title ? 'text-green-700' : 'text-red-700'}>
                        Название {title ? 'заполнено' : 'обязательно'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${description ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={description ? 'text-green-700' : 'text-red-700'}>
                        Описание {description ? 'заполнено' : 'обязательно'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSave()}
                      disabled={saving || !title || !description}
                      className="w-full px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium shadow-lg shadow-green-600/25"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {isCreating ? 'Создать комитет' : 'Сохранить изменения'}
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCancel}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                    >
                      Отмена
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        <span>{images.length} фото</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>{videos.length} видео</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                        <span>HTML контент</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/admin`}>
            <Button
              variant='ghost'
              leftSection={<ArrowLeft size={16} />}
              className="mb-4 text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            >
              Назад к админ панели
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Управление комитетами</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Создавайте и редактируйте комитеты организации</p>
          </div>
          <button
            onClick={handleNew}
            className="px-4 sm:px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Новый комитет
          </button>
        </div>

        {/* Committees Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка комитетов...</p>
            </div>
          </div>
        ) : committees.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Комитетов пока нет</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Создайте первый комитет чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Создать комитет
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {committees.map((committee) => (
              <div
                key={committee._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="p-4 sm:p-6 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {committee.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">
                    {committee.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(committee.createdAt).toLocaleDateString('ru-RU')}</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {committee.media?.imagesUrl?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {committee.media?.videoUrl?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(committee)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 justify-center text-xs sm:text-sm"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Редакт.
                      </button>
                      <button
                        onClick={() => handleViewCommittee(committee._id)}
                        className="px-3 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2 text-xs sm:text-sm"
                        title="Посмотреть комитет"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(committee._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all self-end sm:self-auto"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}