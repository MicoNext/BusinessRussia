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
import { EventMetaInfo } from './_components/EventMetaInfo/EventMetaInfo'
import { ParticipantInfo } from './_components/ParticipantInfo/ParticipantInfo'
import { CommitteeInfo } from './_components/CommitteeInfo/CommitteeInfo'
import { ProjectInfo } from './_components/ProjectInfo/ProjectInfo'
import { EntitySidebar } from './_components/EntitySidebar/EntitySidebar'
import { MediaGallery } from '@/components/ui/MediaGallery/MediaGallery'

export const revalidate = 1690;

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

export async function generateMetadata({ params }: { params: Promise<TParams> }) {
  const { entity, _id } = await params
  const item: any = await getEntityItem(entity, _id)

  if (!item) {
    return {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не существует',
    }
  }

  return {
    title: item.title || 'Детальная страница',
    description: `Детальная информация о ${item.title}`,
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
  const item: any = await getEntityItem(entity, _id)
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
                className="text-blue-600 hover:text-blue-700 w-full sm:w-auto"
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
    <section className='flex-1 bg-gray-50 min-h-screen overflow-hidden'>
      <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8'>
        <Breadcrumbs className='mb-4 sm:mb-6 lg:mb-8' />

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <Headline
            title={title}
            description={
              tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 mt-3 sm:mt-4">
                  {tags.map((tag, index) => (
                    <Badge
                      key={`${index}-${tag}`}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 bg-blue-50 px-3 py-1 text-xs"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )
            }
            classNames={{
              container: 'space-y-3 sm:space-y-4',
              title: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 break-words',
            }}
          />
          {entity === 'events' && <EventMetaInfo event={item} />}
          {entity === 'participants' && <ParticipantInfo participant={item} />}
          {entity === 'committees' && <CommitteeInfo committee={item} />}
          {entity === 'projects' && <ProjectInfo project={item} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {(item.media?.imagesUrl?.length > 0 || item.media?.videoUrl?.length > 0) && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <MediaGallery media={item.media} />
              </div>
            )}

            {html && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <HtmlContent html={html} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <EntitySidebar item={item} />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-start">
          <Link href={`/${entity}`} className="block sm:inline-block">
            <Button
              variant='outline'
              leftSection={<ArrowLeft size={16} className='m-3' />}
              className="
                        border-blue-600 
                        text-blue-600 
                        hover:bg-blue-50 
                        text-sm 
                        sm:text-base 
                        w-full 
                        sm:w-auto
                        px-4 
                        sm:px-6
                        py-2.5
                        sm:py-2
                        font-medium
                        rounded-lg
                        transition-colors
                        duration-200
                        justify-center
                        sm:justify-start
                      "
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