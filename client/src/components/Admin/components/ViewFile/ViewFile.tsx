import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Video, File, ExternalLink } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'

interface ViewFileProps {
  onFileUploaded: (url: string, type: 'image' | 'video') => void
  accept?: string
  maxSize?: number
}

interface UploadedFile {
  id: string
  url: string
  name: string
  type: 'image' | 'video'
  size: number
}

const ViewFile: React.FC<ViewFileProps> = ({
  onFileUploaded,
  accept = 'image/*,video/*',
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Проверка размера файла
    if (file.size > maxSize) {
      setError(`Файл слишком большой. Максимальный размер: ${maxSize / 1024 / 1024}MB`)
      return
    }

    // Определяем тип файла
    const fileType = file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'image'

    await uploadFile(file, fileType)
    
    // Сбрасываем input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadFile = async (file: File, type: 'image' | 'video') => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await adminApiService.callApiBody({
        path: '/api/file',
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const fileUrl = response.data.url
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        url: fileUrl,
        name: file.name,
        type,
        size: file.size
      }

      setUploadedFiles(prev => [...prev, uploadedFile])
      onFileUploaded(fileUrl, type)

    } catch (error) {
      console.error('Ошибка загрузки файла:', error)
      setError('Ошибка при загрузке файла')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const getFileIcon = (type: 'image' | 'video') => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4" />
      case 'video':
        return <Video className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Кнопка загрузки */}
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#2b7de0] transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={accept}
          className="hidden"
          disabled={uploading}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploading ? 'Загрузка...' : 'Загрузить файл'}
        </button>
        
        <p className="text-sm text-gray-500 mt-2">
          Поддерживаются изображения и видео до {maxSize / 1024 / 1024}MB
        </p>
      </div>

      {/* Сообщение об ошибке */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Список загруженных файлов */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Загруженные файлы:</h4>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {file.type === 'image' ? 'Изображение' : 'Видео'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-400 hover:text-[#2b7de0] transition-colors"
                  title="Просмотреть"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Удалить"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewFile