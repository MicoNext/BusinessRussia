'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, Image as ImageIcon, Video, Tag, ExternalLink, Save, ArrowLeft, Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TextEditor from '@/components/Admin/components/TextEditor'
import adminApiService from '@/shared/api/admin.api.service'
import type { INews } from "../../../../../package/types/models/news"
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import { Button } from '@/components/ui/buttons'


export default function AdminNews() {
  const router = useRouter()
  const [news, setNews] = useState<INews[]>([])
  const [selectedNews, setSelectedNews] = useState<INews | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [editorHtml, setEditorHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/news?page=1&limit=1000",
        method: "get"
      })
      setNews(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<INews>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: "/api/news",
        method: "post",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка создания новости:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<INews>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: `/api/news/${id}`,
        method: "put",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления новости:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({
        path: `/api/news/${id}`,
        method: "delete"
      })
      setNews(news.filter(item => item._id !== id))
      if (selectedNews?._id === id) {
        setSelectedNews(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления новости:', error)
    }
  }

  const handleSave = async (html?: string) => {
    try {
      setSaving(true)
      const contentHtml = html || editorHtml

      const newsData: Partial<INews> = {
        title,
        category,
        tags,
        html: contentHtml,
        media: {
          imagesUrl: images,
          videoUrl: videos
        },
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(newsData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedNews(result.data)
        }
      } else if (selectedNews) {
        result = await handleUpdate(selectedNews._id, newsData)
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

  const handleEdit = (newsItem: INews) => {
    setSelectedNews(newsItem)
    setTitle(newsItem.title || '')
    setCategory(newsItem.category || '')
    setTags(newsItem.tags || [])
    setEditorHtml(newsItem.html || '')
    setImages(newsItem.media?.imagesUrl || [])
    setVideos(newsItem.media?.videoUrl || [])
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedNews(null)
    setTitle('')
    setCategory('')
    setTags([])
    setNewTag('')
    setEditorHtml('')
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

  const handleViewPost = (newsId: string) => {
    router.push(`/news/${newsId}`)
  }

  const handleMediaSave = (newImages: string[], newVideos: string[]) => {
    setImages(newImages)
    setVideos(newVideos)
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
              {/* News Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Основная информация о новости
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Заголовок новости *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Введите заголовок"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                        placeholder="Категория новости"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
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
                </div>
              </div>

              {/* Media Manager */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Медиафайлы
                </h2>
                <NewsMediaManager
                  handleSave={handleMediaSave}
                  viewImg={true}
                  viewVideo={true}
                  initialImages={images}
                  initialVideos={videos}
                />
              </div>

              {/* Content Editor */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Содержание новости
                </h2>
                <TextEditor
                  html={selectedNews?.html || ''}
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
                      {isCreating ? 'Создание новости' : 'Редактирование новости'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCreating
                        ? 'Заполните все необходимые поля для создания новости'
                        : 'Внесите изменения в новость'
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
                      <div className={`w-2 h-2 rounded-full ${images.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className={images.length > 0 ? 'text-green-700' : 'text-yellow-700'}>
                        Изображения {images.length > 0 ? 'добавлены' : 'не добавлены'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${videos.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className={videos.length > 0 ? 'text-green-700' : 'text-gray-600'}>
                        Видео {videos.length > 0 ? 'добавлены' : 'не добавлены'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${editorHtml ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className={editorHtml ? 'text-green-700' : 'text-yellow-700'}>
                        Контент {editorHtml ? 'добавлен' : 'не добавлен'}
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => handleSave()}
                    disabled={saving || !title}
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
                        {isCreating ? 'Создать новость' : 'Сохранить изменения'}
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
                        <Tag className="w-3 h-3" />
                        <span>{tags.length} тегов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                        <span>HTML контент</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Символов:</span>
                        <span className="font-medium">{editorHtml.length}</span>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Управление новостями</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Создавайте и редактируйте новости</p>
          </div>
          <button
            onClick={handleNew}
            className="px-4 sm:px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Новая новость
          </button>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка новостей...</p>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Новостей пока нет</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Создайте первую новость чтобы она отобразилась здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Создать новость
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {news.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="p-4 sm:p-6 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {newsItem.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    {newsItem.category && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {newsItem.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {newsItem.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {newsItem.tags && newsItem.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{newsItem.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(newsItem.createdAt).toLocaleDateString('ru-RU')}</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {newsItem.media?.imagesUrl?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {newsItem.media?.videoUrl?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(newsItem)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 justify-center text-xs sm:text-sm"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Редакт.
                      </button>
                      <button
                        onClick={() => handleViewPost(newsItem._id)}
                        className="px-3 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2 text-xs sm:text-sm"
                        title="Посмотреть пост"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(newsItem._id)}
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