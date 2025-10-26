// components/Admin/NewsMediaManager.tsx
'use client'
import { useState } from 'react'
import { Image as ImageIcon, Video, X, ExternalLink } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import ViewFile from './ViewFile'

interface NewsMediaManagerProps {
  viewImg: boolean
  viewVideo: boolean
  handleSave: (images: string[], videos: string[]) => void
  initialImages?: string[]
  initialVideos?: string[]
}

const NewsMediaManager: React.FC<NewsMediaManagerProps> = ({
  viewImg,
  viewVideo,
  handleSave,
  initialImages = [],
  initialVideos = [],
}) => {
  const [images, setImages] = useState<string[]>(initialImages)
  const [videos, setVideos] = useState<string[]>(initialVideos)

  const handleImageUploaded = (url: string) => {
    const newImages = [...images, url]
    setImages(newImages)
    handleSave(newImages, videos)
  }

  const handleVideoUploaded = (url: string) => {
    const newVideos = [...videos, url]
    setVideos(newVideos)
    handleSave(images, newVideos)
  }


  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    handleSave(newImages, videos)
  }

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index)
    setVideos(newVideos)
    handleSave(images, newVideos)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Управление медиа</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Загрузка изображений */}
        {viewImg &&
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-gray-700" />
              <h4 className="font-medium text-gray-900">Изображения</h4>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {images.length}
              </span>
            </div>

            <ViewFile
              onFileUploaded={handleImageUploaded}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
            />

            {/* Список изображений */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Изображение ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        }

        {viewVideo &&

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-gray-700" />
              <h4 className="font-medium text-gray-900">Видео</h4>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {videos.length}
              </span>
            </div>

            <ViewFile
              onFileUploaded={handleVideoUploaded}
              accept="video/*"
              maxSize={50 * 1024 * 1024}
            />

            {videos.length > 0 && (
              <div className="mt-4 space-y-3">
                {videos.map((url, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate">
                        Видео {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-[#2b7de0] transition-colors"
                        title="Просмотреть"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => removeVideo(index)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default NewsMediaManager