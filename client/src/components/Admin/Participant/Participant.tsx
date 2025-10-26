'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, User, Building, Award, ExternalLink, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import adminApiService from '@/shared/api/admin.api.service'
import type { IParticipant } from "../../../../../package/types/models/participant"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import TextEditor from '../components/TextEditor'

export default function AdminParticipant() {
  const router = useRouter()
  const [participants, setParticipants] = useState<IParticipant[]>([])
  const [selectedParticipant, setSelectedParticipant] = useState<IParticipant | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [role, setRole] = useState<"manager" | "boardMember" | "invited">("invited")
  const [editorHtml, setEditorHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({ 
        path: "/api/participant?page=1&limit=1000", 
        method: "get" 
      })
      setParticipants(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки участников:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<IParticipant>) => {
    try {
      const response = await adminApiService.callApiBody({ 
        path: "/api/participant", 
        method: "post", 
        body: { data } 
      })
      return response
    } catch (error) {
      console.error('Ошибка создания участника:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<IParticipant>) => {
    try {
      const response = await adminApiService.callApiBody({ 
        path: `/api/participant/${id}`, 
        method: "put", 
        body: { data } 
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления участника:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({ 
        path: `/api/participant/${id}`, 
        method: "delete" 
      })
      setParticipants(participants.filter(item => item._id !== id))
      if (selectedParticipant?._id === id) {
        setSelectedParticipant(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления участника:', error)
    }
  }

  const handleSave = async (html?: string) => {
    try {
      setSaving(true)
      const contentHtml = html || editorHtml
      
      const participantData: Partial<IParticipant> = {
        name,
        jobTitle,
        organization,
        role,
        html: contentHtml,
        media: {
          imagesUrl: images,
          videoUrl: videos
        },
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(participantData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedParticipant(result.data)
        }
      } else if (selectedParticipant) {
        result = await handleUpdate(selectedParticipant._id, participantData)
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

  const handleEdit = (participant: IParticipant) => {
    setSelectedParticipant(participant)
    setName(participant.name || '')
    setJobTitle(participant.jobTitle || '')
    setOrganization(participant.organization || '')
    setRole(participant.role || 'invited')
    setEditorHtml(participant.html || '')
    setImages(participant.media?.imagesUrl || [])
    setVideos(participant.media?.videoUrl || [])
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedParticipant(null)
    setName('')
    setJobTitle('')
    setOrganization('')
    setRole('invited')
    setEditorHtml('')
    setImages([])
    setVideos([])
  }

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
    setIsCreating(false)
  }

  const handleViewParticipant = (participantId: string) => {
    router.push(`/participant/${participantId}`)
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'manager': return 'Руководитель'
      case 'boardMember': return 'Член правления'
      case 'invited': return 'Приглашенный'
      default: return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return 'bg-red-100 text-red-800'
      case 'boardMember': return 'bg-blue-100 text-blue-800'
      case 'invited': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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

          {/* Форма редактирования участника */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Введите имя и фамилию"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Должность *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Должность участника"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Организация
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Название организации"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Роль *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as "manager" | "boardMember" | "invited")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    required
                  >
                    <option value="invited">Приглашенный</option>
                    <option value="boardMember">Член правления</option>
                    <option value="manager">Руководитель</option>
                  </select>
                </div>

                {/* Превью загруженного изображения */}
                {images.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фотография участника
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={images[0]}
                        alt="Превью участника"
                        className="w-32 h-32 object-cover rounded-xl border border-gray-300"
                      />
                      <button
                        onClick={() => setImages([])}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Удалить фотографию"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Менеджер медиа для загрузки фотографии */}
          {images.length === 0 && (
            <div className="mb-6">
              <NewsMediaManager
                handleSave={(images: string[], videos: string[]) => {
                  // Берем только первое изображение для фотографии
                  if (images.length > 0) {
                    setImages([images[0]])
                  }
                  setVideos(videos)
                }}
                viewImg={true}
                viewVideo={true}
                initialImages={[]}
                initialVideos={[]}
              />
            </div>
          )}

          {/* Редактор контента */}
          <TextEditor
            html={selectedParticipant?.html || ''}
            onSave={handleEditorSave}
          />

          {/* Кнопка сохранения */}
          <div className="sticky bottom-6 mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Создание участника' : 'Редактирование участника'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {isCreating 
                    ? 'Заполните все необходимые поля и нажмите кнопку ниже для создания участника' 
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
                  disabled={saving || !name || !jobTitle || !role}
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
                      {isCreating ? 'Создать участника' : 'Сохранить изменения'}
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление участниками</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте участников организации</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новый участник
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка участников...</p>
            </div>
          </div>
        ) : participants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Участников пока нет</h3>
            <p className="text-gray-600 mb-6">Создайте первого участника чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Создать участника
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map((participant) => (
              <div
                key={participant._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {participant.media?.imagesUrl?.[0] ? (
                      <img
                        src={participant.media.imagesUrl[0]}
                        alt={participant.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-300"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {participant.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(participant.role)}`}>
                        {getRoleLabel(participant.role)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span className="line-clamp-2">{participant.jobTitle}</span>
                    </div>
                    
                    {participant.organization && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span className="line-clamp-2">{participant.organization}</span>
                      </div>
                    )}
                  </div>

                  {participant.html && (
                    <div className="text-sm text-gray-600 mb-3 line-clamp-3" 
                         dangerouslySetInnerHTML={{ __html: participant.html }} />
                  )}

                  <div className="text-xs text-gray-500">
                    <span>Добавлен: {new Date(participant.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(participant)}
                        className="px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleViewParticipant(participant._id)}
                        className="px-4 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2"
                        title="Посмотреть участника"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(participant._id)}
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