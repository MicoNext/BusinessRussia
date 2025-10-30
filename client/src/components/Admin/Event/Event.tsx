'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, Calendar, MapPin, Clock, Tag, ExternalLink, Save, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TextEditor from '@/components/Admin/components/TextEditor'
import adminApiService from '@/shared/api/admin.api.service'
import type { IEvent } from "../../../../../package/types/models/events"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminEvent() {
  const router = useRouter()
  const [events, setEvents] = useState<IEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('')
  const [editorHtml, setEditorHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/event?page=1&limit=1000",
        method: "get"
      })
      setEvents(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки событий:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<IEvent>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: "/api/event",
        method: "post",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка создания события:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<IEvent>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: `/api/event/${id}`,
        method: "put",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления события:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({
        path: `/api/event/${id}`,
        method: "delete"
      })
      setEvents(events.filter(item => item._id !== id))
      if (selectedEvent?._id === id) {
        setSelectedEvent(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления события:', error)
    }
  }

  const handleSave = async (html?: string) => {
    try {
      setSaving(true)
      const contentHtml = html || editorHtml

      // Берем первое изображение из массива для поля url
      const imageUrl = images.length > 0 ? images[0] : ''

      const eventData: Partial<IEvent> = {
        title,
        url: imageUrl, // Используем первое изображение как url
        tags,
        html: contentHtml,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        location,
        time,
        category,
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(eventData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedEvent(result.data)
        }
      } else if (selectedEvent) {
        result = await handleUpdate(selectedEvent._id, eventData)
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

  const handleEdit = (event: IEvent) => {
    setSelectedEvent(event)
    setTitle(event.title || '')
    setTags(event.tags || [])
    setStartDate(event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '')
    setEndDate(event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : '')
    setLocation(event.location || '')
    setTime(event.time || '')
    setCategory(event.category || '')
    setEditorHtml(event.html || '')

    // Устанавливаем изображение из url в массив images
    const initialImages = event.url ? [event.url] : []
    setImages(initialImages)

    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedEvent(null)
    setTitle('')
    setTags([])
    setNewTag('')
    setStartDate('')
    setEndDate('')
    setLocation('')
    setTime('')
    setCategory('')
    setEditorHtml('')
    setImages([])
  }

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
    setIsCreating(false)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleViewEvent = (eventId: string) => {
    router.push(`/event/${eventId}`)
  }

  const formatEventDate = (event: IEvent) => {
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : null

    if (end && start.toDateString() !== end.toDateString()) {
      return `${start.toLocaleDateString('ru-RU')} - ${end.toLocaleDateString('ru-RU')}`
    }
    return start.toLocaleDateString('ru-RU')
  }

  const isUpcoming = (event: IEvent) => {
    return new Date(event.startDate) >= new Date()
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

          {/* Форма редактирования события */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название события *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Введите название события"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Категория события"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата начала *
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата окончания
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="14:00 - 16:00 или В любое время"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Место проведения
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Адрес или название места"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Теги
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                      placeholder="Добавить тег"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-blue-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Менеджер медиа для загрузки одного изображения */}
          {images.length === 0 && (
            <div className="mb-6">
              <NewsMediaManager
                handleSave={(images: string[], videos: string[]) => {
                  if (images.length > 0) {
                    setImages([images[0]])
                  }
                }}
                viewImg={true}
                viewVideo={false}
                initialImages={[]}
                initialVideos={[]}
              />
            </div>
          )}

          {/* Превью загруженного изображения */}
          {images.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Изображение события</h3>
              <div className="relative inline-block">
                <img
                  src={images[0]}
                  alt="Превью события"
                  className="w-64 h-48 object-cover rounded-xl border border-gray-300"
                />
                <button
                  onClick={() => setImages([])}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Удалить изображение"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Редактор контента */}
          <TextEditor
            html={selectedEvent?.html || ''}
            onSave={handleEditorSave}
          />

          {/* Кнопка сохранения */}
          <div className="sticky bottom-6 mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Создание события' : 'Редактирование события'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {isCreating
                    ? 'Заполните все необходимые поля и нажмите кнопку ниже для создания события'
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
                  disabled={saving || !title || !startDate}
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
                      {isCreating ? 'Создать событие' : 'Сохранить изменения'}
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
            <h1 className="text-3xl font-bold text-gray-900">Управление событиями</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте события организации</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новое событие
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка событий...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Событий пока нет</h3>
            <p className="text-gray-600 mb-6">Создайте первое событие чтобы оно отобразилось здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Создать событие
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className={`bg-white rounded-2xl border shadow-lg hover:shadow-xl transition-all overflow-hidden ${isUpcoming(event)
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200'
                  }`}
              >
                <div className="p-6">
                  {event.url && (
                    <img
                      src={event.url}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                      {event.title}
                    </h3>
                    {isUpcoming(event) && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium ml-2">
                        Предстоящее
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatEventDate(event)}</span>
                    </div>

                    {event.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {event.category && (
                    <div className="mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {event.category}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {event.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {event.tags && event.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{event.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    <span>Создано: {new Date(event.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleViewEvent(event._id)}
                        className="px-4 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2"
                        title="Посмотреть событие"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(event._id)}
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