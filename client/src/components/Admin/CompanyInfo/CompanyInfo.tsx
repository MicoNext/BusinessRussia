'use client'
import { useState, useEffect } from 'react'
import { Save, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import { ICompanyInfo } from '../../../../../package/types/models/companyInfo'
import TextEditor from '../components/TextEditor'
import { Icon } from '@/components/ui/socialIcons'

export default function AdminAboutPage() {
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    
    const [formData, setFormData] = useState({
        aboutHtml: '',
        address: '',
        email: '',
        phone: '',
        whatsappUrl: '',
        maxUrl: '',
        telegramUrl: '',
        vkUrl: ''
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
                    vkUrl: response.data.vkUrl || ''
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

    // Прелоадер пока данные загружаются
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
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Страница "О «Деловой России»"</h1>
                        <p className="text-gray-600 mt-2">
                            Редактирование контента и контактной информации
                        </p>
                    </div>
                </div>

                {/* Основной редактор контента */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Текст страницы</h2>
                    
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

                {/* Контактная информация */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Контактная информация</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-2" />
                                    Адрес
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="Введите адрес компании"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="flex block text-sm font-medium text-gray-700 mb-2">
                                    <Icon iconName='whatsapp' className='mr-2' /> WhatsApp URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.whatsappUrl}
                                    onChange={(e) => handleInputChange('whatsappUrl', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="https://wa.me/..."
                                />
                            </div>

                            <div>
                                <label className="flex block text-sm font-medium text-gray-700 mb-2">
                                    <Icon iconName='max' className='mr-2' /> Max URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.maxUrl}
                                    onChange={(e) => handleInputChange('maxUrl', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="flex block text-sm font-medium text-gray-700 mb-2">
                                    <Icon iconName='telegram' className='mr-2' /> Telegram URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.telegramUrl}
                                    onChange={(e) => handleInputChange('telegramUrl', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="https://t.me/..."
                                />
                            </div>

                            <div>
                                <label className="flex block text-sm font-medium text-gray-700 mb-2">
                                    <Icon iconName='vk' className='mr-2' /> VK URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.vkUrl}
                                    onChange={(e) => handleInputChange('vkUrl', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="https://vk.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопка сохранения */}
                <div className="sticky bottom-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Сохранение информации
                            </h3>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
    )
}