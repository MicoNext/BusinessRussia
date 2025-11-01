export function EntitySidebar({ item }: { item: any }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-3 text-base">Информация</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="font-medium">Создано:</span>
            <span>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>
          {item.updatedAt && (
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="font-medium">Обновлено:</span>
              <span>{new Date(item.updatedAt).toLocaleDateString('ru-RU')}</span>
            </div>
          )}
        </div>
      </div>

      {(item.category || item.location) && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-base">Детали</h3>
          <div className="space-y-3 text-sm">
            {item.category && (
              <div className="flex justify-between items-start py-1">
                <span className="font-medium text-gray-700 flex-shrink-0 mr-2">Категория:</span>
                <span className="text-gray-600 text-right break-words">{item.category}</span>
              </div>
            )}
            {item.location && (
              <div className="flex justify-between items-start py-1">
                <span className="font-medium text-gray-700 flex-shrink-0 mr-2">Местоположение:</span>
                <span className="text-gray-600 text-right break-words">{item.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}