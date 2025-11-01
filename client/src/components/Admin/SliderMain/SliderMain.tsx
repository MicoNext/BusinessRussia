'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, Image as ImageIcon, Video, Tag, ExternalLink, Save, Type, ArrowLeft } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import type { ISliderMain } from "../../../../../package/types/models/sliderMain"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminSliderMain() {
  const [sliders, setSliders] = useState<ISliderMain[]>([])
  const [selectedSlider, setSelectedSlider] = useState<ISliderMain | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'img' | 'video'>('img')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [overlay, setOverlay] = useState(false)
  const [sourseUrl, setSourseUrl] = useState('')
  const [buttonName, setButtonName] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/slider-main?page=1&limit=1000",
        method: "get"
      })
      setSliders(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки слайдов:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<ISliderMain>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: "/api/slider-main",
        method: "post",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка создания слайда:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<ISliderMain>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: `/api/slider-main/${id}`,
        method: "put",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления слайда:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({
        path: `/api/slider-main/${id}`,
        method: "delete"
      })
      setSliders(sliders.filter(item => item._id !== id))
      if (selectedSlider?._id === id) {
        setSelectedSlider(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления слайда:', error)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Определяем URL из загруженных файлов
      let mediaUrl = ''
      if (type === 'img' && images.length > 0) {
        mediaUrl = images[0]
      } else if (type === 'video' && videos.length > 0) {
        mediaUrl = videos[0]
      }

      const sliderData: Partial<ISliderMain> = {
        type,
        url: mediaUrl,
        title,
        subtitle,
        text,
        tags,
        overlay,
        sourse: {
          url: sourseUrl || null,
          buttonName: buttonName || null
        },
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(sliderData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedSlider(result.data)
        }
      } else if (selectedSlider) {
        result = await handleUpdate(selectedSlider._id, sliderData)
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

  const handleEdit = (slider: ISliderMain) => {
    setSelectedSlider(slider)
    setType(slider.type)
    setUrl(slider.url)
    setTitle(slider.title)
    setSubtitle(slider.subtitle || '')
    setText(slider.text || '')
    setTags(slider.tags || [])
    setOverlay(slider.overlay)
    setSourseUrl(slider.sourse?.url || '')
    setButtonName(slider.sourse?.buttonName || '')

    // Устанавливаем медиа файлы в зависимости от типа
    if (slider.type === 'img' && slider.url) {
      setImages([slider.url])
      setVideos([])
    } else if (slider.type === 'video' && slider.url) {
      setVideos([slider.url])
      setImages([])
    }

    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedSlider(null)
    setType('img')
    setUrl('')
    setTitle('')
    setSubtitle('')
    setText('')
    setTags([])
    setNewTag('')
    setOverlay(false)
    setSourseUrl('')
    setButtonName('')
    setImages([])
    setVideos([])
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

  const getTypeIcon = (type: 'img' | 'video') => {
    return type === 'img' ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />
  }

  const getTypeLabel = (type: 'img' | 'video') => {
    return type === 'img' ? 'Изображение' : 'Видео'
  }

  // Обработчик загрузки медиа - ограничиваем одним файлом
  const handleMediaUpload = (images: string[], videos: string[]) => {
    if (type === 'img') {
      // Берем только первый файл
      setImages(images.slice(0, 1))
      setVideos([])
    } else {
      // Берем только первый файл
      setVideos(videos.slice(0, 1))
      setImages([])
    }
  }

  // Получаем текущий медиа файл для превью
  const getCurrentMedia = () => {
    if (type === 'img' && images.length > 0) {
      return images[0]
    } else if (type === 'video' && videos.length > 0) {
      return videos[0]
    }
    return null
  }

  // Очистка загруженного медиа
  const handleClearMedia = () => {
    if (type === 'img') {
      setImages([])
    } else {
      setVideos([])
    }
  }

  useEffect(() => {
    handleFind()
  }, [])

  if (isEditing || isCreating) {
    const currentMedia = getCurrentMedia()

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
              {/* Slider Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Основная информация слайда
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Заголовок *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Основной заголовок слайда"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Подзаголовок
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Дополнительный подзаголовок"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Текст слайда
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all resize-none text-sm"
                        placeholder="Описание или призыв к действию"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Type Selection */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Медиа контент
                </h2>
                
                {/* Content Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Тип контента *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setType('img')
                        setVideos([])
                      }}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center gap-3 transition-all ${
                        type === 'img'
                          ? 'border-[#2b7de0] bg-blue-50 text-[#2b7de0]'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span className="font-medium">Изображение</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setType('video')
                        setImages([])
                      }}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center gap-3 transition-all ${
                        type === 'video'
                          ? 'border-[#2b7de0] bg-blue-50 text-[#2b7de0]'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Video className="w-5 h-5" />
                      <span className="font-medium">Видео</span>
                    </button>
                  </div>
                </div>

                {/* Media Preview */}
                {currentMedia && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Превью контента
                    </label>
                    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 relative">
                      {type === 'img' ? (
                        <div className="space-y-3">
                          <img
                            src={currentMedia}
                            alt="Превью слайда"
                            className="w-full max-w-md h-48 object-cover rounded-lg mx-auto"
                          />
                          <div className="text-center">
                            <button
                              onClick={handleClearMedia}
                              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 mx-auto text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Удалить изображение
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-full max-w-md h-48 bg-gray-800 rounded-lg flex items-center justify-center mx-auto">
                            <Video className="w-12 h-12 text-white" />
                          </div>
                          <div className="text-center">
                            <button
                              onClick={handleClearMedia}
                              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 mx-auto text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Удалить видео
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Media Upload */}
                {!currentMedia && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Загрузка {type === 'img' ? 'изображения' : 'видео'}
                    </h3>
                    <NewsMediaManager
                      handleSave={handleMediaUpload}
                      viewImg={type === 'img'}
                      viewVideo={type === 'video'}
                      initialImages={[]}
                      initialVideos={[]}
                    />
                  </div>
                )}
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Tags Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Теги</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
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
                            className="ml-1 hover:text-blue-600 text-sm"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button Settings */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Кнопка действия</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL кнопки
                      </label>
                      <input
                        type="url"
                        value={sourseUrl}
                        onChange={(e) => setSourseUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Текст кнопки
                      </label>
                      <input
                        type="text"
                        value={buttonName}
                        onChange={(e) => setButtonName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Узнать больше"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                      <input
                        type="checkbox"
                        id="overlay"
                        checked={overlay}
                        onChange={(e) => setOverlay(e.target.checked)}
                        className="w-4 h-4 text-[#2b7de0] border-gray-300 rounded focus:ring-[#2b7de0]"
                      />
                      <label htmlFor="overlay" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Затемняющий оверлей
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Save Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isCreating ? 'Создание слайда' : 'Редактирование слайда'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCreating
                        ? 'Заполните все необходимые поля для создания слайда'
                        : 'Внесите изменения в слайд'
                      }
                    </p>
                  </div>

                  {/* Validation Status */}
                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${title ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={title ? 'text-green-700' : 'text-red-700'}>
                        Заголовок {title ? 'заполнен' : 'обязателен'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${currentMedia ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={currentMedia ? 'text-green-700' : 'text-red-700'}>
                        Медиа {currentMedia ? 'загружено' : 'обязательно'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${type === 'img' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                      <span className={type === 'img' ? 'text-blue-700' : 'text-purple-700'}>
                        {type === 'img' ? 'Изображение' : 'Видео'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${overlay ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                      <span className={overlay ? 'text-yellow-700' : 'text-gray-600'}>
                        Оверлей {overlay ? 'включен' : 'выключен'}
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={saving || !title || !currentMedia}
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
                        {isCreating ? 'Создать слайд' : 'Сохранить изменения'}
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
                        <Type className="w-3 h-3" />
                        <span>{type === 'img' ? 'Изобр.' : 'Видео'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{tags.length} тегов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{sourseUrl ? 'Кнопка' : 'Нет кн.'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${overlay ? 'bg-black' : 'bg-gray-400'}`} />
                        <span>Оверлей</span>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Главный слайдер</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Управление слайдами на главной странице</p>
          </div>
          <button
            onClick={handleNew}
            className="px-4 sm:px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Новый слайд
          </button>
        </div>

        {/* Sliders Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка слайдов...</p>
            </div>
          </div>
        ) : sliders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Слайдов пока нет</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Создайте первый слайд чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Создать слайд
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sliders.map((slider) => (
              <div
                key={slider._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="relative">
                  {slider.type === 'img' ? (
                    <img
                      src={slider.url}
                      alt={slider.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  )}
                  {slider.overlay && (
                    <div className="absolute inset-0 bg-black bg-opacity-30" />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      slider.type === 'img' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {getTypeIcon(slider.type)}
                      {getTypeLabel(slider.type)}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {slider.title}
                  </h3>

                  {slider.subtitle && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {slider.subtitle}
                    </p>
                  )}

                  {slider.text && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {slider.text}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {slider.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {slider.tags && slider.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{slider.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {slider.sourse?.url && slider.sourse?.buttonName && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        <ExternalLink className="w-3 h-3" />
                        {slider.sourse.buttonName}
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    <span>Создан: {new Date(slider.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slider)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 justify-center text-xs sm:text-sm"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Редакт.
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(slider._id)}
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