import { HtmlContent } from '@/components/ui/HtmlContent'
import { MemberCard } from './_components/MemberCard'
import { IParticipant } from '../../../../../../../package/types/models/participant'
import { notFound } from 'next/navigation'
import { ArrowLeft, Image as ImageIcon, Video, FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/Button'
import { Badge } from '@/components/ui/Badge'
import ssgApiService from '@/shared/api/ssg.api.service'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MediaGallery } from '@/components/ui/MediaGallery/MediaGallery'

export const revalidate = 1690

export async function generateMetadata({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params
  const participant: IParticipant = JSON.parse(JSON.stringify(await ssgApiService.getParticipants(1, 1, _id)))

  if (!participant) {
    return {
      title: 'Участник не найден'
    }
  }

  return {
    title: `${participant.name} - ${participant.jobTitle}`,
    description: participant.organization
      ? `${participant.jobTitle} в ${participant.organization}`
      : participant.jobTitle
  }
}

function ParticipantSidebar({ participant }: { participant: IParticipant }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Информация о профиле
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Дата создания:</span>
            <span className="font-medium text-gray-900">
              {new Date(participant.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Статус:</span>
            <Badge
              size="sm"
              className={
                participant.role === 'manager' ? 'bg-red-100 text-red-800 border-red-200' :
                  participant.role === 'boardMember' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-green-100 text-green-800 border-green-200'
              }
            >
              {participant.role === 'manager' ? 'Руководитель' :
                participant.role === 'boardMember' ? 'Член правления' : 'Приглашенный'}
            </Badge>
          </div>
        </div>
      </div>

      {(participant.media?.imagesUrl?.length > 0 || participant.media?.videoUrl?.length > 0) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Медиа-контент</h3>
          <div className="space-y-2 text-sm">
            {participant.media.imagesUrl && participant.media.imagesUrl.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Фотографии:
                </span>
                <span className="font-medium text-gray-900">
                  {participant.media.imagesUrl.length} шт
                </span>
              </div>
            )}
            {participant.media.videoUrl && participant.media.videoUrl.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Видео:
                </span>
                <span className="font-medium text-gray-900">
                  {participant.media.videoUrl.length} шт
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default async function MemberPage({
  params
}: {
  params: Promise<{ _id: string }>
}) {
  const { _id } = await params
  const participant: IParticipant = JSON.parse(JSON.stringify(await ssgApiService.getParticipants(1, 1, _id)))
  const companyInfo = await ssgApiService.getCompanyInfo()

  if (!participant) {
    notFound()
  }

  const html = participant.html

  return (
    <>
      <Header companyInfo={companyInfo} />
      <section className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mb-6">
            <Link href="/organization/team">
              <Button
                variant="ghost"
                leftSection={<ArrowLeft size={16} />}
                className="text-blue-600 hover:text-blue-700"
              >
                Назад к команде
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <MemberCard member={participant} />
              </div>

              {(participant.media?.imagesUrl?.length > 0 || participant.media?.videoUrl?.length > 0) && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <MediaGallery media={participant.media} />
                </div>
              )}

              {html && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Дополнительная информация
                    </h3>
                  </div>
                  <HtmlContent html={html} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <ParticipantSidebar participant={participant} />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/organization/team">
              <Button
                variant="outline"
                leftSection={<ArrowLeft size={16} />}
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
                      font-medium
                      rounded-lg
                      transition-colors
                      duration-200
                      flex           
                      items-center   
                      justify-center 
                      gap-2      
                "

              >
                Вернуться к списку участников
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer companyInfo={companyInfo} />
    </>
  )
}
