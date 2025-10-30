import { HtmlContent } from '@/components/ui/HtmlContent';
import { MemberCard } from './_components/MemberCard';
import { IParticipant } from '../../../../../../../package/types/models/participant';
import { notFound } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons/Button';
import { Badge } from '@/components/ui/Badge';
import ssgApiService from '@/shared/api/ssg.api.service';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 1690;

export async function generateMetadata({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;
  const participant: IParticipant = JSON.parse(JSON.stringify(await ssgApiService.getParticipants(1, 1, _id)))

  if (!participant) {
    return {
      title: 'Участник не найден',
    };
  }

  return {
    title: `${participant.name} - ${participant.jobTitle}`,
    description: participant.organization
      ? `${participant.jobTitle} в ${participant.organization}`
      : participant.jobTitle,
  };
}

function MediaGallery({ media }: { media: IParticipant['media'] }) {
  const { imagesUrl = [], videoUrl = [] } = media || {};

  if (imagesUrl.length === 0 && videoUrl.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {imagesUrl.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            Фотогалерея ({imagesUrl.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imagesUrl.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-300"
              >
                <div className="relative aspect-square w-full">
                  <img
                    src={image}
                    alt={`Фото участника ${index + 1}`}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">
                    Фото {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {videoUrl.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Video className="w-6 h-6 text-purple-600" />
            Видеоматериалы ({videoUrl.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videoUrl.map((video, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
              >
                <video
                  controls
                  className="w-full aspect-video rounded-2xl"
                  poster={imagesUrl[0]} // Используем первое фото как постер
                >
                  <source src={video} type="video/mp4" />
                  <source src={video} type="video/webm" />
                  <source src={video} type="video/ogg" />
                  Ваш браузер не поддерживает видео тег.
                </video>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 text-white">
                    🎥 Видео {index + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// Компонент боковой панели с дополнительной информацией
function ParticipantSidebar({ participant }: { participant: IParticipant }) {
  return (
    <div className="space-y-6">
      {/* Блок с основной информацией */}
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

      {/* Блок с медиа-статистикой */}
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
                  {participant.media.imagesUrl.length} шт.
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
                  {participant.media.videoUrl.length} шт.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const participant: IParticipant = JSON.parse(JSON.stringify(await ssgApiService.getParticipants(1, 1, _id)))
  const companyInfo = await ssgApiService.getCompanyInfo()

  if (!participant) {
    notFound();
  }

  const html = participant.html;

  return (<>
    <Header companyInfo={companyInfo} />
    <section className="flex-1 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Кнопка назад */}
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
          {/* Основной контент */}
          <div className="lg:col-span-3 space-y-6">
            {/* Карточка участника */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <MemberCard member={participant} />
            </div>

            {/* Медиа-галерея */}
            {(participant.media?.imagesUrl?.length > 0 || participant.media?.videoUrl?.length > 0) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <MediaGallery media={participant.media} />
              </div>
            )}

            {/* HTML контент */}
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

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <ParticipantSidebar participant={participant} />
          </div>
        </div>

        {/* Футер с кнопкой назад */}
        <div className="mt-8 text-center">
          <Link href="/organization/team">
            <Button
              variant="outline"
              leftSection={<ArrowLeft size={16} />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Вернуться к списку участников
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer companyInfo={companyInfo} />
  </>
  );
}