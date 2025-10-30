import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Clock, Users, Building, Tag, Image as ImageIcon, Video, ExternalLink, Flame } from 'lucide-react'
import { SectionBar } from '@/components/ui/SectionBar/SectionBar'
import { Headline } from '@/components/ui/Headline'
import { HtmlContent } from '@/components/ui/HtmlContent'
import { type EntitySlug } from '@/shared/constants/entities'
import { Button } from '@/components/ui/buttons/Button'
import { Badge } from '@/components/ui/Badge'
import { TParams } from '../types'
import Header from '@/components/Header'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ICompanyInfo } from '../../../../../../package/types/models/companyInfo'
import Footer from '@/components/Footer'
import ssgApiService from '@/shared/api/ssg.api.service'


async function getEntityItem(entity: EntitySlug, id: string) {
  switch (entity) {
    case 'news':
      return await ssgApiService.getNews(1, 1, id)
    case 'events':
      return await ssgApiService.getEvents(1, 1, id)
    case 'projects':
      return await ssgApiService.getProjects(1, 1, id)
    case 'committees':
      return await ssgApiService.getCommittees(1, 1, id)
    case 'participants':
      return await ssgApiService.getParticipants(1, 1, id)
    default:
      return null
  }
}

function MediaGallery({ media }: { media: { imagesUrl?: string[]; videoUrl?: string[] } }) {
  const { imagesUrl = [], videoUrl = [] } = media || {}
  
  if (imagesUrl.length === 0 && videoUrl.length === 0) return null

  return (
    <div className="space-y-6">
      {imagesUrl.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Галерея изображений
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {imagesUrl.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Изображение ${index + 1}`}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl border border-gray-200 group-hover:shadow-lg transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {videoUrl.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Video className="w-5 h-5" />
            Видео
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {videoUrl.map((video, index) => (
              <div key={index} className="relative">
                <video
                  controls
                  className="w-full rounded-xl border border-gray-200"
                  poster={imagesUrl[0]}
                >
                  <source src={video} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EventMetaInfo({ event }: { event: any }) {
  const hasMetaInfo = event.startDate || event.location || event.time || event.category
  
  if (!hasMetaInfo) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Информация о событии</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {event.startDate && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Дата</p>
              <p className="font-medium text-blue-900">
                {new Date(event.startDate).toLocaleDateString('ru-RU')}
                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('ru-RU')}`}
              </p>
            </div>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Место</p>
              <p className="font-medium text-blue-900">{event.location}</p>
            </div>
          </div>
        )}

        {event.time && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Время</p>
              <p className="font-medium text-blue-900">{event.time}</p>
            </div>
          </div>
        )}

        {event.category && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Категория</p>
              <p className="font-medium text-blue-900">{event.category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ParticipantInfo({ participant }: { participant: any }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {participant.media?.imagesUrl?.[0] && (
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={participant.media.imagesUrl[0]}
              alt={participant.name}
              className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-2xl border-4 border-white shadow-lg"
            />
          </div>
        )}

        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{participant.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2 justify-center lg:justify-start">
              <Badge size="lg" className="bg-blue-600 text-white">
                {participant.role === 'manager' && 'Руководитель'}
                {participant.role === 'boardMember' && 'Член правления'}
                {participant.role === 'invited' && 'Приглашенный'}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {participant.jobTitle && (
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-lg text-gray-700">{participant.jobTitle}</span>
              </div>
            )}

            {participant.organization && (
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-lg text-gray-700">{participant.organization}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CommitteeInfo({ committee }: { committee: any }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-6">
      <div className="space-y-4">
        {committee.description && (
          <p className="text-lg text-blue-800 leading-relaxed">{committee.description}</p>
        )}
        
        {committee.participant && committee.participant.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Участники комитета ({committee.participant.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {committee.participant.map((participant: string, index: number) => (
                <Badge key={index} size="sm" className="bg-blue-600 text-white">
                  {participant}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectInfo({ project }: { project: any }) {
  const hasProjectInfo = project.category || project.tags?.length > 0 || project.url || project.isBig
  if (!hasProjectInfo) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Информация о проекте</h3>
      <div className="flex flex-wrap gap-4">
        {project.category && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800">{project.category}</span>
          </div>
        )}
        
        {project.isBig && (
          <Badge size="sm" className="bg-blue-600 text-white flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Большой проект
          </Badge>
        )}
        
        {project.url && (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            Ссылка на внешний источник
          </a>
        )}
      </div>
      
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Теги проекта</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" size="sm" className="border-blue-300 text-blue-700">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EntitySidebar({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Информация</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Создано: {new Date(item.createdAt).toLocaleDateString('ru-RU')}</p>
          {item.updatedAt && (
            <p>Обновлено: {new Date(item.updatedAt).toLocaleDateString('ru-RU')}</p>
          )}
        </div>
      </div>

      {(item.category || item.location) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Детали</h3>
          <div className="space-y-2 text-sm">
            {item.category && (
              <p className="text-gray-600">
                <span className="font-medium">Категория:</span> {item.category}
              </p>
            )}
            {item.location && (
              <p className="text-gray-600">
                <span className="font-medium">Местоположение:</span> {item.location}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<TParams> }) {
  const { entity, _id } = await params
  const item = await getEntityItem(entity, _id)

  if (!item) {
    return {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не существует',
    }
  }

  return {
    title: item.title || 'Детальная страница',
    description: item.description || item.excerpt || `Детальная информация о ${item.title}`,
    openGraph: {
      title: item.title,
      description: item.description || item.excerpt,
      images: item.media?.imagesUrl?.[0] ? [item.media.imagesUrl[0]] : [],
    },
  }
}

export async function generateStaticParams() {
  return []
}

export default async function EntityDetailsPage({ params }: { params: Promise<TParams> }) {
  const { entity, _id } = await params
  const item = await getEntityItem(entity, _id)
  const companyInfo: ICompanyInfo = await ssgApiService.getCompanyInfo()
  
  if (!item) {
    return (
      <section className='flex-1'>
        <div className='container mx-auto space-y-6 px-4'>
          <SectionBar
            leftSection={
              <Headline
                title="Страница не найдена"
                description="Запрашиваемая страница не существует или была удалена"
              />
            }
          />
          <div>
            <Link href={`/${entity}`}>
              <Button
                variant='ghost'
                leftSection={<ArrowLeft size={16} />}
                className="text-blue-600 hover:text-blue-700"
              >
                Назад к списку
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const title: string = item.title || item.name
  const html: string | undefined = item.html || item.content || item.description
  const tags: string[] = item?.tags && Array.isArray(item?.tags) ? item.tags : []

  return <>
  <Header companyInfo={companyInfo} />
    <section className='flex-1 bg-gray-50 min-h-screen'>      
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        <Breadcrumbs className='mb-8' />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6">
          <Headline
            title={title}
            description={
              tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, index) => (
                    <Badge key={`${index}-${tag}`} variant="outline" size="sm" className="border-blue-300 text-blue-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )
            }
            classNames={{
              container: 'space-y-4',
              title: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900',
            }}
          />

          {entity === 'events' && <EventMetaInfo event={item} />}
          {entity === 'participants' && <ParticipantInfo participant={item} />}
          {entity === 'committees' && <CommitteeInfo committee={item} />}
          {entity === 'projects' && <ProjectInfo project={item} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3 space-y-6">
            {(item.media?.imagesUrl?.length > 0 || item.media?.videoUrl?.length > 0) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <MediaGallery media={item.media} />
              </div>
            )}

            {html && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <HtmlContent html={html} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <EntitySidebar item={item} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href={`/${entity}`}>
            <Button
              variant='outline'
              leftSection={<ArrowLeft size={16} />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm sm:text-base"
            >
              Вернуться к списку
            </Button>
          </Link>
        </div>
      </div>
    </section>
  <Footer companyInfo={companyInfo} />
  </>
}