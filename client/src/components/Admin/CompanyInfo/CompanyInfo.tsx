'use client'
import { useState, useEffect } from 'react'
import { Save, MapPin, Phone, Mail, Clock, Image as ImageIcon, Trash2, Plus } from 'lucide-react'
import adminApiService from '@/shared/api/admin.api.service'
import { ICompanyInfo, ISocialMedia } from '../../../../../package/types/models/companyInfo'
import TextEditor from '../components/TextEditor'
import NewsMediaManager from '../components/ViewFile/NewsMediaManager'

const socialMediaIcons = {
    vk: 'VK',
    telegram: 'TG',
    youtube: 'YT',
    rutube: 'RT',
    whatsapp: 'WA'
}

const socialMediaColors = {
    vk: 'bg-blue-600',
    telegram: 'bg-blue-500',
    youtube: 'bg-red-600',
    rutube: 'bg-red-500',
    whatsapp: 'bg-green-500'
}

export default function AdminCompanyInfo() {
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        email: '',
        workingHours: '',
        ymapApiKey: '',
        centerCoordinates: '',
        zoomDefault: 10,
        logoAlt: ''
    })

    const [socialMedia, setSocialMedia] = useState<ISocialMedia[]>([])
    const [newSocialMedia, setNewSocialMedia] = useState<Omit<ISocialMedia, 'iconName'> & { iconName: string }>({
        iconName: 'vk',
        href: '',
        title: ''
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
                    address: response.data.address || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    workingHours: response.data.workingHours || '',
                    ymapApiKey: response.data.map?.ymapApiKey || '',
                    centerCoordinates: response.data.map?.centerCoordinates || '',
                    zoomDefault: response.data.map?.zoomDefault || 10,
                    logoAlt: response.data.logo?.alt || ''
                })
                setSocialMedia(response.data.socialMedia || [])
                setImages(response.data.logo?.imageUrl ? [response.data.logo.imageUrl] : [])
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

            // Собираем полный объект согласно интерфейсу
            const companyData: ICompanyInfo = {
                ...companyInfo, // Сохраняем существующие данные
                address: formData.address || undefined,
                phone: formData.phone || undefined,
                email: formData.email || undefined,
                workingHours: formData.workingHours || undefined,
                socialMedia: socialMedia.length > 0 ? socialMedia : undefined,
                map: formData.ymapApiKey ? {
                    ymapApiKey: formData.ymapApiKey,
                    centerCoordinates: formData.centerCoordinates,
                    zoomDefault: formData.zoomDefault
                } : undefined,
                logo: images.length > 0 ? {
                    imageUrl: images[0],
                    alt: formData.logoAlt
                } : undefined
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
            workingHours: html
        }))
    }

    const addSocialMedia = () => {
        if (newSocialMedia.href.trim() && newSocialMedia.iconName) {
            setSocialMedia([...socialMedia, {
                iconName: newSocialMedia.iconName as ISocialMedia['iconName'],
                href: newSocialMedia.href.trim(),
                title: newSocialMedia.title?.trim() || undefined
            }])
            setNewSocialMedia({
                iconName: 'vk',
                href: '',
                title: ''
            })
        }
    }

    const removeSocialMedia = (index: number) => {
        setSocialMedia(socialMedia.filter((_, i) => i !== index))
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleNumberInputChange = (field: string, value: string) => {
        const numValue = parseInt(value) || 0
        setFormData(prev => ({
            ...prev,
            [field]: numValue
        }))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSocialMedia()
        }
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
                        <h1 className="text-3xl font-bold text-gray-900">Информация о компании</h1>
                        <p className="text-gray-600 mt-2">
                            Управление контактной информацией и настройками
                        </p>
                    </div>
                </div>

                {/* Основная информация */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Контактная информация</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <MapPin className="w-5 h-5 inline mr-2" />
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
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <Phone className="w-5 h-5 inline mr-2" />
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
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <Mail className="w-5 h-5 inline mr-2" />
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
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Clock className="w-5 h-5 inline mr-2" />
                            Время работы
                        </label>
                        <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                            <TextEditor
                                html={formData.workingHours}
                                onSave={handleEditorSave}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Используйте редактор для форматирования текста
                        </p>
                    </div>
                </div>
                {/* Логотип */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Логотип компании</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Альтернативный текст
                            </label>
                            <input
                                type="text"
                                value={formData.logoAlt}
                                onChange={(e) => handleInputChange('logoAlt', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                placeholder="Название компании"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Текст для SEO и доступности
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Изображение логотипа
                            </label>

                            {images.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="relative inline-block">
                                        <img
                                            src={images[0]}
                                            alt="Превью логотипа"
                                            className="w-48 h-48 object-contain border-2 border-gray-300 rounded-2xl"
                                        />
                                        <button
                                            onClick={() => setImages([])}
                                            className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                            title="Удалить логотип"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8">
                                    <div className="text-center">
                                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg mb-6">
                                            Перетащите изображение или нажмите для загрузки
                                        </p>
                                        <div className="max-w-2xl mx-auto">
                                            <NewsMediaManager
                                                handleSave={(images: string[]) => setImages(images.slice(0, 1))}
                                                viewImg={true}
                                                viewVideo={false}
                                                initialImages={[]}
                                                initialVideos={[]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Социальные сети */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Социальные сети</h2>

                    <div className="space-y-6">
                        {/* Форма добавления новой соцсети */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Платформа
                                </label>
                                <select
                                    value={newSocialMedia.iconName}
                                    onChange={(e) => setNewSocialMedia(prev => ({ ...prev, iconName: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                >
                                    <option value="vk">VKontakte</option>
                                    <option value="telegram">Telegram</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="rutube">Rutube</option>
                                    <option value="whatsapp">WhatsApp</option>
                                </select>
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ссылка *
                                </label>
                                <input
                                    type="url"
                                    value={newSocialMedia.href}
                                    onChange={(e) => setNewSocialMedia(prev => ({ ...prev, href: e.target.value }))}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={addSocialMedia}
                                    disabled={!newSocialMedia.href.trim()}
                                    className="w-full px-6 py-3 bg-[#2b7de0] text-white rounded-xl hover:bg-[#1e5fb0] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-5 h-5" />
                                    Добавить
                                </button>
                            </div>
                        </div>

                        {/* Список соцсетей */}
                        <div className="space-y-3">
                            {socialMedia.map((social, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${socialMediaColors[social.iconName]}`}>
                                            {socialMediaIcons[social.iconName]}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium text-gray-900 truncate">
                                                {social.href}
                                            </div>
                                            {social.title && (
                                                <div className="text-sm text-gray-500 truncate">
                                                    {social.title}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeSocialMedia(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0 ml-4"
                                        title="Удалить"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}

                            {socialMedia.length === 0 && (
                                <div className="text-center py-12 text-gray-500 text-lg">
                                    Социальные сети не добавлены
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Настройки карты */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Настройки карты</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                API ключ Яндекс.Карт
                            </label>
                            <input
                                type="text"
                                value={formData.ymapApiKey}
                                onChange={(e) => handleInputChange('ymapApiKey', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                placeholder="Ваш API ключ"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Координаты центра
                            </label>
                            <input
                                type="text"
                                value={formData.centerCoordinates}
                                onChange={(e) => handleInputChange('centerCoordinates', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                                placeholder="55.7558, 37.6173"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Формат: широта,долгота
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Масштаб по умолчанию
                            </label>
                            <input
                                type="number"
                                value={formData.zoomDefault}
                                onChange={(e) => handleNumberInputChange('zoomDefault', e.target.value)}
                                min="1"
                                max="20"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all"
                            />
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
                            <p className="text-gray-600 text-sm mt-1">
                                Все изменения будут применены к основному сайту
                            </p>
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