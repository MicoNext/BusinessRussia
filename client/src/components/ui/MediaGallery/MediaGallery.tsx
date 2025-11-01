'use client'

import { useState } from 'react'
import { ImageIcon, Video, X, ChevronLeft, ChevronRight } from "lucide-react"

export function MediaGallery({ media }: { media: { imagesUrl?: string[]; videoUrl?: string[] } }) {
  const { imagesUrl = [], videoUrl = [] } = media || {}
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  
  if (imagesUrl.length === 0 && videoUrl.length === 0) return null

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex(selectedImageIndex === 0 ? imagesUrl.length - 1 : selectedImageIndex - 1)
  }

  const goToNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex(selectedImageIndex === imagesUrl.length - 1 ? 0 : selectedImageIndex + 1)
  }

  return (
    <>
      <div className="space-y-6">
        {imagesUrl.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Галерея изображений
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {imagesUrl.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group aspect-square cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image}
                    alt={`Изображение ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl border border-gray-200 group-hover:shadow-lg transition-all"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-xl sm:rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        )}

        {videoUrl.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5" />
              Видео
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {videoUrl.map((video, index) => (
                <div key={index} className="relative">
                  <video
                    controls
                    className="w-full rounded-xl sm:rounded-2xl border border-gray-200"
                    poster={imagesUrl[0]}
                    preload="metadata"
                  >
                    <source src={video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно для изображений */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Кнопка предыдущего изображения */}
            {imagesUrl.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Изображение */}
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              <img
                src={imagesUrl[selectedImageIndex]}
                alt={`Изображение ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Кнопка следующего изображения */}
            {imagesUrl.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Индикатор текущего изображения */}
            {imagesUrl.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {imagesUrl.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}