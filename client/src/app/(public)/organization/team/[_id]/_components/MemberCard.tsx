import { Building, Calendar, Badge, Image, Video, FileText } from 'lucide-react'
import { IParticipant } from '../../../../../../../../package/types/models/participant'
import { Badge as UiBadge } from '@/components/ui/Badge'

interface IMemberCardProps {
	member: IParticipant
}

export function MemberCard({ member }: IMemberCardProps) {
	const getRoleText = (role: string) => {
		switch (role) {
			case 'manager':
				return 'Руководитель'
			case 'boardMember':
				return 'Член правления'
			case 'invited':
				return 'Приглашенный'
			default:
				return role
		}
	}

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'manager':
				return 'bg-red-100 text-red-800 border-red-200'
			case 'boardMember':
				return 'bg-blue-100 text-blue-800 border-blue-200'
			case 'invited':
				return 'bg-green-100 text-green-800 border-green-200'
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	return (
		<section className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
			<div className="flex flex-col lg:flex-row">
				{member.media?.imagesUrl?.[0] && (
					<div className="lg:w-64 lg:flex-shrink-0 relative">
						<div className="relative w-full h-64 lg:h-full">
							<img
								src={member.media.imagesUrl[0]}
								alt={`Фото ${member.name}`}
								className="w-full h-full object-cover"
								sizes="(max-width: 1024px) 100vw, 256px"
							/>
						</div>
						<div className="lg:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
					</div>
				)}

				<div className="flex-1 p-6 lg:p-8">
					<div className="mb-6">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
							<h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
								{member.name}
							</h2>
							<UiBadge 
								size="lg" 
								className={`${getRoleColor(member.role)} font-semibold`}
							>
								{getRoleText(member.role)}
							</UiBadge>
						</div>
						
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<Calendar className="w-4 h-4" />
							<span>
								В команде с {new Date(member.createdAt).toLocaleDateString('ru-RU')}
							</span>
						</div>
					</div>

					<div className="space-y-4">
						{member.jobTitle && (
							<div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
								<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
									<Badge className="w-4 h-4 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-blue-900 mb-1">Должность</p>
									<p className="text-lg font-semibold text-gray-900">{member.jobTitle}</p>
								</div>
							</div>
						)}

						{member.organization && (
							<div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
								<div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
									<Building className="w-4 h-4 text-green-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-green-900 mb-1">Организация</p>
									<p className="text-lg font-semibold text-gray-900">{member.organization}</p>
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
							<div className="text-center sm:text-left">
								<p className="text-sm text-gray-500 mb-1">Статус</p>
								<p className="font-medium text-gray-900">
									{member.role === 'manager' ? 'Основной состав' : 
									 member.role === 'boardMember' ? 'Правление' : 'Приглашенный'}
								</p>
							</div>

							{member.media?.imagesUrl && member.media.imagesUrl.length > 0 && (
								<div className="text-center sm:text-left">
									<p className="text-sm text-gray-500 mb-1">Фотографии</p>
									<p className="font-medium text-gray-900">
										{member.media.imagesUrl.length} шт.
									</p>
								</div>
							)}
						</div>

						{(member.media?.imagesUrl?.length > 0 || member.media?.videoUrl?.length > 0) && (
							<div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
								{member.media.imagesUrl && member.media.imagesUrl.length > 0 && (
									<span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
										<Image className="w-3 h-3" />
										{member.media.imagesUrl.length} фото
									</span>
								)}
								{member.media.videoUrl && member.media.videoUrl.length > 0 && (
									<span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
										<Video className="w-3 h-3" />
										{member.media.videoUrl.length} видео
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{member.html && (
				<div className="border-t border-gray-100 bg-gray-50/50 px-6 lg:px-8 py-4">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<FileText className="w-4 h-4" />
						<span>Содержит дополнительную информацию</span>
					</div>
				</div>
			)}
		</section>
	)
}