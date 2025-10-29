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
  const [newParticipant, setNewParticipant] = useState('')
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
    setNewParticipant('')
    setEditorHtml('')
    setImages([])
    setVideos([])
  }

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
    setIsCreating(false)
  }

  const addParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant('')
    }
  }

  const removeParticipant = (participantToRemove: string) => {
    setParticipants(participants.filter(participant => participant !== participantToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addParticipant()
    }
  }

  const handleViewCommittee = (committeeId: string) => {
    router.push(`/committees/${committeeId}`)
  }

  useEffect(() => {
    handleFind()
  }, [])

  if (isEditing || isCreating) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              ← Назад к списку
            </button>
          </div>

          {/* Форма редактирования комитета */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название комитета *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all resize-none"
                    placeholder="Краткое описание комитета"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Участники комитета
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newParticipant}
                      onChange={(e) => setNewParticipant(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                      placeholder="Добавить участника"
                    />
                    <button
                      type="button"
                      onClick={addParticipant}
                      className="px-4 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {participants.map((participant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{participant}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeParticipant(participant)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Менеджер медиа */}
          <div className="mb-6">
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

          {/* Редактор контента */}
          <TextEditor
            html={selectedCommittee?.html || ''}
            onSave={handleEditorSave}
          />

          {/* Кнопка сохранения */}
          <div className="sticky bottom-6 mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Создание комитета' : 'Редактирование комитета'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {isCreating
                    ? 'Заполните все необходимые поля и нажмите кнопку ниже для создания комитета'
                    : 'Внесите изменения и нажмите кнопку ниже для сохранения'
                  }
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleSave()}
                  disabled={saving || !title || !description}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление комитетами</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте комитеты организации</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новый комитет
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка комитетов...</p>
            </div>
          </div>
        ) : committees.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Комитетов пока нет</h3>
            <p className="text-gray-600 mb-6">Создайте первый комитет чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Создать комитет
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee) => (
              <div
                key={committee._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {committee.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {committee.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Users className="w-4 h-4" />
                    <span>{committee.participant?.length || 0} участников</span>
                  </div>
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
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(committee)}
                        className="px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleViewCommittee(committee._id)}
                        className="px-4 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2"
                        title="Посмотреть комитет"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(committee._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
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