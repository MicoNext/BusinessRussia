import { Tag, ExternalLink, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function ProjectInfo({ project }: { project: any }) {
  const hasProjectInfo = project.category || project.tags?.length > 0 || project.url || project.isBig
  if (!hasProjectInfo) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-3 sm:mb-4">Информация о проекте</h3>
      
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-start">
        {project.category && (
          <div className="flex items-center gap-2 text-sm sm:text-base bg-white px-3 py-2 rounded-lg border border-blue-100">
            <Tag className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-blue-800 font-medium">{project.category}</span>
          </div>
        )}
        
        {project.isBig && (
          <Badge size="sm" className="bg-orange-500 text-white flex items-center gap-1 px-3 py-2">
            <Flame className="w-3 h-3" />
            Большой проект
          </Badge>
        )}
        
        {project.url && (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm border border-blue-200"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[200px]">Внешний источник</span>
          </a>
        )}
      </div>
    </div>
  )
}