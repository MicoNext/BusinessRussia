'use client'
import { useEffect, useState } from 'react';
import { 
  Newspaper, 
  Users, 
  Calendar, 
  User, 
  Folder, 
  Sliders, 
  LogOut,
  Library,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sign from '@/components/Admin/Sign/Sign';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const adminModules = [
    {
      title: 'Информация о компании',
      description: 'Управление контактной информацией и настройками',
      icon: Library,
      href: '/admin/company-info',
      color: 'bg-blue-500'
    },
	  {
      title: 'Главный слайдер',
      description: 'Управление слайдером на главной',
      icon: Sliders,
      href: '/admin/slider-main',
      color: 'bg-pink-500'
    },
    {
      title: 'Новости',
      description: 'Управление новостями и статьями',
      icon: Newspaper,
      href: '/admin/news',
      color: 'bg-blue-500'
    },
	    {
      title: 'События',
      description: 'Управление событиями и мероприятиями',
      icon: Calendar,
      href: '/admin/event',
      color: 'bg-purple-500'
    },
    {
      title: 'Участники',
      description: 'Управление участниками и членами',
      icon: User,
      href: '/admin/participant',
      color: 'bg-orange-500'
    },
    {
      title: 'Проекты',
      description: 'Управление проектами организации',
      icon: Folder,
      href: '/admin/project',
      color: 'bg-indigo-500'
    },
    {
      title: 'Комитеты',
      description: 'Управление комитетами организации',
      icon: Users,
      href: '/admin/committee',
      color: 'bg-green-500'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  if (!auth) return <Sign setAuth={setAuth} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Администратор</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Новости</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Комитеты</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">События</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Участники</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Модули управления</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adminModules.map((module, index) => (
              <div
                key={index}
                onClick={() => router.push(module.href)}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group hover:border-[#2b7de0]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.color} text-white`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-[#2b7de0] rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#2b7de0] transition-colors">
                  {module.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
