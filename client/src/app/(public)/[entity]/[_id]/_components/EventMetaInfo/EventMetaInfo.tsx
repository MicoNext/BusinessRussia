import { Calendar, Clock, MapPin, Tag } from "lucide-react"

export function EventMetaInfo({ event }: { event: any }) {
  const hasMetaInfo = event.startDate || event.location || event.time || event.category
  
  if (!hasMetaInfo) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Информация о событии</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {event.startDate && (
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg sm:rounded-xl border border-blue-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-blue-600">Дата</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">
                {new Date(event.startDate).toLocaleDateString('ru-RU')}
                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('ru-RU')}`}
              </p>
            </div>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg sm:rounded-xl border border-blue-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-blue-600">Место</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">{event.location}</p>
            </div>
          </div>
        )}

        {event.time && (
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg sm:rounded-xl border border-blue-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-blue-600">Время</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">{event.time}</p>
            </div>
          </div>
        )}

        {event.category && (
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg sm:rounded-xl border border-blue-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-blue-600">Категория</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">{event.category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}