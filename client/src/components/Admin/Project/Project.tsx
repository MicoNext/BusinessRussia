'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, EyeOff, Image as ImageIcon, Video, Tag, ExternalLink, Save, Star, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import adminApiService from '@/shared/api/admin.api.service'
import { IProject } from '../../../../../package/types/models/projects'
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'
import TextEditor from '../components/TextEditor'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminProject() {
  const router = useRouter()
  const [projects, setProjects] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isBig, setIsBig] = useState(false)
  const [editorHtml, setEditorHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/project?page=1&limit=1000",
        method: "get"
      })
      setProjects(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<IProject>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: "/api/project",
        method: "post",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка создания проекта:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: Partial<IProject>) => {
    try {
      const response = await adminApiService.callApiBody({
        path: `/api/project/${id}`,
        method: "put",
        body: { data }
      })
      return response
    } catch (error) {
      console.error('Ошибка обновления проекта:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.callApi({
        path: `/api/project/${id}`,
        method: "delete"
      })
      setProjects(projects.filter(item => item._id !== id))
      if (selectedProject?._id === id) {
        setSelectedProject(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Ошибка удаления проекта:', error)
    }
  }

  const handleSave = async (html?: string) => {
    try {
      setSaving(true)
      const contentHtml = html || editorHtml

      const projectData: Partial<IProject> = {
        title,
        slug,
        url,
        category,
        tags,
        isBig,
        html: contentHtml,
        media: {
          imagesUrl: images,
          videoUrl: videos
        },
        createdAt: new Date()
      }

      let result
      if (isCreating) {
        result = await handleCreate(projectData)
        setIsCreating(false)
        if (result?.data) {
          setSelectedProject(result.data)
        }
      } else if (selectedProject) {
        result = await handleUpdate(selectedProject._id, projectData)
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

  const handleEdit = (project: IProject) => {
    setSelectedProject(project)
    setTitle(project.title || '')
    setSlug(project.slug || '')
    setUrl(project.url || '')
    setCategory(project.category || '')
    setTags(project.tags || [])
    setIsBig(project.isBig || false)
    setEditorHtml(project.html || '')
    setImages(project.media?.imagesUrl || [])
    setVideos(project.media?.videoUrl || [])
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleNew = () => {
    resetForm()
    setIsCreating(true)
    setIsEditing(false)
  }

  const resetForm = () => {
    setSelectedProject(null)
    setTitle('')
    setSlug('')
    setUrl('')
    setCategory('')
    setTags([])
    setNewTag('')
    setIsBig(false)
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

  const handleViewProject = (projectId: string) => {
    router.push(`/project/${projectId}`)
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

          {/* Форма редактирования проекта */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="Введите название проекта"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="url-slug"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Внешняя ссылка
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                    placeholder="https://example.com"
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
                    placeholder="Категория проекта"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="isBig"
                    checked={isBig}
                    onChange={(e) => setIsBig(e.target.checked)}
                    className="w-4 h-4 text-[#2b7de0] border-gray-300 rounded focus:ring-[#2b7de0]"
                  />
                  <label htmlFor="isBig" className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Большой проект (выделенное отображение)
                  </label>
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
            html={selectedProject?.html || ''}
            onSave={handleEditorSave}
          />

          {/* Кнопка сохранения */}
          <div className="sticky bottom-6 mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Создание проекта' : 'Редактирование проекта'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {isCreating
                    ? 'Заполните все необходимые поля и нажмите кнопку ниже для создания проекта'
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
                  disabled={saving || !title || !slug}
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
                      {isCreating ? 'Создать проект' : 'Сохранить изменения'}
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
            <h1 className="text-3xl font-bold text-gray-900">Управление проектами</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте проекты организации</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новый проект
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка проектов...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Проектов пока нет</h3>
            <p className="text-gray-600 mb-6">Создайте первый проект чтобы он отобразился здесь</p>
            <button
              onClick={handleNew}
              className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Создать проект
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className={`bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden ${project.isBig ? 'ring-2 ring-yellow-400' : ''
                  }`}
              >
                <div className="p-6">
                  {project.media?.imagesUrl?.[0] && (
                    <img
                      src={project.media.imagesUrl[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                      {project.title}
                    </h3>
                    {project.isBig && (
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{project.slug}</span>
                    {project.category && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {project.tags && project.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {project.html && (
                    <div className="text-sm text-gray-600 mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: project.html }} />
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(project.createdAt).toLocaleDateString('ru-RU')}</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {project.media?.imagesUrl?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {project.media?.videoUrl?.length || 0}
                      </span>
                    </div>
                  </div>

                  {project.url && (
                    <div className="mt-3">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2b7de0] hover:underline"
                      >
                        Внешняя ссылка →
                      </a>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleViewProject(project._id)}
                        className="px-4 py-2 border border-[#2b7de0] text-[#2b7de0] rounded-xl hover:bg-[#2b7de0] hover:text-white transition-all flex items-center gap-2"
                        title="Посмотреть проект"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(project._id)}
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