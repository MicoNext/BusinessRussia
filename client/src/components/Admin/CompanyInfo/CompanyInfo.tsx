'use client'
import { useState, useEffect } from 'react'
import { Save, MapPin, Phone, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import { ICompanyInfo } from '../../../../../package/types/models/companyInfo'
import TextEditor from '../components/TextEditor'
import { Icon } from '@/components/ui/socialIcons'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'

export default function AdminAboutPage() {
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showToken, setShowToken] = useState(false)

    const [formData, setFormData] = useState({
        aboutHtml: '',
        address: '',
        email: '',
        phone: '',
        whatsappUrl: '',
        maxUrl: '',
        telegramUrl: '',
        vkUrl: '',
        tgBotToken: '',
        adminTgChatId: '',
    })

    const handleFind = async () => {
        try {
            setLoading(true)
            const response = await adminApiService.callApi({
                path: "/api/company-info",
                method: "get"
            })

            if (response.data) {
                setCompanyInfo(response.data)
                // Заполняем форму данными
                setFormData({
                    aboutHtml: response.data.about?.html || '',
                    address: response.data.address || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    whatsappUrl: response.data.whatsappUrl || '',
                    maxUrl: response.data.maxUrl || '',
                    telegramUrl: response.data.telegramUrl || '',
                    vkUrl: response.data.vkUrl || '',
                    adminTgChatId: response.data.adminTgChatId || '',
                    tgBotToken: response.data.tgBotToken || '',
                })
            }
        } catch (error) {
            console.error('Ошибка загрузки информации о компании:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            const companyData: ICompanyInfo = {
                ...companyInfo, // Сохраняем существующие данные
                about: {
                    html: formData.aboutHtml
                },
                address: formData.address || undefined,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
                whatsappUrl: formData.whatsappUrl || undefined,
                maxUrl: formData.maxUrl || undefined,
                telegramUrl: formData.telegramUrl || undefined,
                vkUrl: formData.vkUrl || undefined,
                adminTgChatId: formData.adminTgChatId || undefined,
                tgBotToken: formData.tgBotToken || undefined,
            }

            let result = await adminApiService.callApiBody({
                path: `/api/company-info`,
                method: "put",
                body: { data: companyData }
            })

            if (result?.data) {
                setCompanyInfo(result.data)
                console.log('Данные успешно сохранены')
            }

        } catch (error) {
            console.error('Ошибка сохранения:', error)
            alert('Ошибка при сохранении данных')
        } finally {
            setSaving(false)
        }
    }

    const handleEditorSave = (html: string) => {
        setFormData(prev => ({
            ...prev,
            aboutHtml: html
        }))
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    useEffect(() => {
        handleFind()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Загрузка данных</h2>
                    <p className="text-gray-600">Загружаем информацию о компании...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
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

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
                    {/* Left Column - Main Content */}
                    <div className="xl:col-span-3 space-y-4 sm:space-y-6">
                        {/* Page Header */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Страница "О «Деловой России»"</h1>
                                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                        Редактирование контента и контактной информации
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Текст страницы</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Содержание страницы "О компании"
                                    </label>
                                    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                                        <TextEditor
                                            html={formData.aboutHtml}
                                            onSave={handleEditorSave}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Используйте редактор для форматирования текста страницы
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Контактная информация</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Адрес
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="Введите адрес компании"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 mr-2" />
                                            Телефон
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="+7 (XXX) XXX-XX-XX"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Icon iconName='whatsapp' className='w-4 h-4 mr-2' />
                                            WhatsApp URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.whatsappUrl}
                                            onChange={(e) => handleInputChange('whatsappUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="https://wa.me/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Icon iconName='max' className='w-4 h-4 mr-2' />
                                            Max URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.maxUrl}
                                            onChange={(e) => handleInputChange('maxUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Icon iconName='telegram' className='w-4 h-4 mr-2' />
                                            Telegram URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.telegramUrl}
                                            onChange={(e) => handleInputChange('telegramUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="https://t.me/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Icon iconName='vk' className='w-4 h-4 mr-2' />
                                            VK URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.vkUrl}
                                            onChange={(e) => handleInputChange('vkUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                            placeholder="https://vk.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Telegram Bot Access */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Доступы к телеграм Боту</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Icon iconName='telegram' className='w-4 h-4 mr-2' />
                                        Телеграм Бот Токен
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showToken ? "text" : "password"}
                                            value={formData.tgBotToken}
                                            onChange={(e) => handleInputChange('tgBotToken', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm pr-12"
                                            placeholder="ваш_бот_токен"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowToken(!showToken)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <Icon iconName='telegram' className='w-4 h-4 mr-2' />
                                        Телеграм UserId
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.adminTgChatId}
                                        onChange={(e) => handleInputChange('adminTgChatId', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all text-sm"
                                        placeholder="ваш_id"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Save Panel */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Сохранение информации
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Все изменения будут отображены на сайте после сохранения
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${formData.aboutHtml ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        <span className={formData.aboutHtml ? 'text-green-700' : 'text-yellow-700'}>
                                            Контент {formData.aboutHtml ? 'заполнен' : 'не заполнен'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${formData.address || formData.phone || formData.email ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        <span className={formData.address || formData.phone || formData.email ? 'text-green-700' : 'text-gray-600'}>
                                            Контакты {formData.address || formData.phone || formData.email ? 'добавлены' : 'отсутствуют'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${formData.tgBotToken && formData.adminTgChatId ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className={formData.tgBotToken && formData.adminTgChatId ? 'text-green-700' : 'text-red-700'}>
                                            Бот {formData.tgBotToken && formData.adminTgChatId ? 'настроен' : 'не настроен'}
                                        </span>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="w-full px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium shadow-lg shadow-green-600/25"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Сохранение...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Сохранить изменения
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}