'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, User, Building, Award, ExternalLink, Save, ArrowLeft, Image as ImageIcon, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import adminApiService from '@/shared/api/admin.api.service'
import type { IParticipant } from "../../../../../package/types/models/participant"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import TextEditor from '../components/TextEditor'
import { Button } from '@/components/ui/buttons'
import Link from 'next/link'

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
    router.push(`/organization/team/${participantId}`)
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'manager': return 'Руководитель'
      case 'boardMember': return 'Член совета'
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
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к списку
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-4 sm:space-y-6">
              {/* Participant Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Основная информация об участнике
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя и фамилия *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Должность участника"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Организация
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Название организации"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Роль *
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as "manager" | "boardMember" | "invited")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        required
                      >
                        <option value="invited">Приглашенный</option>
                        <option value="boardMember">Член совета</option>
                        <option value="manager">Руководитель</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Manager */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Медиафайлы участника
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Фотографии участника {images.length > 0 && `(${images.length})`}
                    </h3>
                    {images.length > 0 && (
                      <div className="mb-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Фото участника ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                onClick={() => setImages(images.filter((_, i) => i !== index))}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="Удалить фото"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <NewsMediaManager
                    handleSave={(newImages: string[], newVideos: string[]) => {
                      setImages([...images, ...newImages])
                      setVideos([...videos, ...newVideos])
                    }}
                    viewImg={true}
                    viewVideo={true}
                    initialImages={[]}
                    initialVideos={[]}
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Дополнительная информация
                </h2>
                <TextEditor
                  html={selectedParticipant?.html || ''}
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
                      {isCreating ? 'Создание участника' : 'Редактирование участника'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCreating
                        ? 'Заполните все необходимые поля для создания участника'
                        : 'Внесите изменения в данные участника'
                      }
                    </p>
                  </div>

                  {/* Validation Status */}
                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${name ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={name ? 'text-green-700' : 'text-red-700'}>
                        Имя {name ? 'заполнено' : 'обязательно'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${jobTitle ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={jobTitle ? 'text-green-700' : 'text-red-700'}>
                        Должность {jobTitle ? 'заполнена' : 'обязательна'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${images.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className={images.length > 0 ? 'text-green-700' : 'text-yellow-700'}>
                        Фото {images.length > 0 ? 'добавлены' : 'не добавлены'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${videos.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className={videos.length > 0 ? 'text-green-700' : 'text-gray-600'}>
                        Видео {videos.length > 0 ? 'добавлены' : 'не добавлены'}
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => handleSave()}
                    disabled={saving || !name || !jobTitle || !role}
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
                        {isCreating ? 'Создать участника' : 'Сохранить изменения'}
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    Отмена
                  </button>

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
                        <User className="w-3 h-3" />
                        <span>{getRoleLabel(role)}</span>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Управление участниками</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Создавайте и редактируйте участников организации</p>
          </div>
          <button
            onClick={handleNew}
            className="px-4 sm:px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Новый участник
          </button>
        </div>

        {/* Participants Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка участников...</p>
            </div>
          </div>
        ) : participants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Участников пока нет</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Создайте первого участника чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Создать участника
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {participants.map((participant) => (
              <div
                key={participant._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="p-4 sm:p-6 flex-1">
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
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
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
                    <div 
                      className="text-sm text-gray-600 mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: participant.html }} 
                    />
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Добавлен: {new Date(participant.createdAt).toLocaleDateString('ru-RU')}</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {participant.media?.imagesUrl?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {participant.media?.videoUrl?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(participant)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 justify-center text-xs sm:text-sm"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Редакт.
                      </button>
                      <button
                        onClick={() => handleViewParticipant(participant._id)}
                        className="px-3 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2 text-xs sm:text-sm"
                        title="Посмотреть участника"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(participant._id)}
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