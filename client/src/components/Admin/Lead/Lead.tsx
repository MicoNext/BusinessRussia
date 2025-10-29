'use client'
import { useState, useEffect } from 'react'
import { EyeOff, Phone, Mail, User, MessageSquare, Calendar, Search, Filter, ArrowLeft } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import type { ILead } from "../../../../../package/types/models/lead"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminLeads() {
  const [leads, setLeads] = useState<ILead[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLeads, setFilteredLeads] = useState<ILead[]>([])

  const handleFind = async () => {
    try {
      setLoading(true)
      const response = await adminApiService.callApi({
        path: "/api/lead?page=1&limit=1000",
        method: "get"
      })
      setLeads(response.data || [])
      setFilteredLeads(response.data || [])
    } catch (error) {
      console.error('Ошибка загрузки лидов:', error)
    } finally {
      setLoading(false)
    }
  }

  // Фильтрация лидов
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLeads(leads)
      return
    }

    const filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredLeads(filtered)
  }, [searchTerm, leads])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-indigo-500',
      'bg-red-500'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  useEffect(() => {
    handleFind()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900">Заявки (Лиды)</h1>
            <p className="text-gray-600 mt-2">Просмотр всех поступивших заявок</p>
          </div>
        </div>
        {!loading && leads.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
                <div className="text-sm text-blue-700">Всего заявок</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {leads.filter(lead => lead.email).length}
                </div>
                <div className="text-sm text-green-700">С email</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">
                  {leads.filter(lead => lead.comment).length}
                </div>
                <div className="text-sm text-purple-700">С комментариями</div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск по имени, телефону, email или комментарию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              Найдено: {filteredLeads.length} из {leads.length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Загрузка заявок...</p>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'Заявки не найдены' : 'Заявок пока нет'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Попробуйте изменить условия поиска'
                : 'Все новые заявки будут отображаться здесь'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all"
              >
                Очистить поиск
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Аватар */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${getRandomColor(lead.name)}`}>
                        {getInitials(lead.name)}
                      </div>
                    </div>

                    {/* Основная информация */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            {lead.name}
                          </h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <a
                                href={`tel:${lead.phone}`}
                                className="hover:text-[#2b7de0] transition-colors"
                              >
                                {lead.phone}
                              </a>
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="hover:text-[#2b7de0] transition-colors"
                                >
                                  {lead.email}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <Calendar className="w-4 h-4" />
                              {formatDate(lead.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Комментарий */}
                      {lead.comment && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            Комментарий:
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {lead.comment}
                          </p>
                        </div>
                      )}
                    </div>
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