
'use client'
import { useEffect, useState } from 'react';
import TextEditor from '@/components/Admin/TextEditor/TextEditor';
import Sign from '@/components/Admin/Sign/Sign';

export default function AdminPage() {
		const [auth, setAuth] = useState(false)

	useEffect(() => {
		if(localStorage.getItem("token")) setAuth(true)
	})

  const [savedContent, setSavedContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async (content: string) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSavedContent(content);
      setLastSaved(new Date());
      
      // Здесь можно отправить на сервер
      console.log('Отправка на сервер:', content);
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      throw error; // Пробрасываем ошибку для обработки в редакторе
    }
  };

	if(!auth) return <Sign setAuth={setAuth} />

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Текстовый редактор
          </h1>
          <p className="text-gray-600 mt-2">
            Создавайте и редактируйте контент с богатым форматированием
          </p>
          
          {lastSaved && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                Последнее сохранение: {lastSaved.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TextEditor
              initialContent="<p>Начните редактировать ваш контент здесь...</p>"
              onSave={handleSave}
              editable={true}
            />
          </div>
          
          <div className="space-y-6">
            {savedContent && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Предпросмотр сохраненного контента
                </h2>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: savedContent }}
                />
              </div>
            )}
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Информация о редакторе
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✅ Сохранение работает через колбэк onSave</p>
                <p>✅ Вывод в консоль при каждом сохранении</p>
                <p>✅ Статусы сохранения: загрузка, успех, ошибка</p>
                <p>✅ Поддержка async/await для API запросов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}