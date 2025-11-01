import { Users, Building } from "lucide-react";
import { Badge } from '@/components/ui/Badge'

export function ParticipantInfo({ participant }: { participant: any }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start">
        {participant.media?.imagesUrl?.[0] && (
          <div className="flex-shrink-0">
            <img
              src={participant.media.imagesUrl[0]}
              alt={participant.name}
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover rounded-xl sm:rounded-2xl border-4 border-white shadow-lg"
            />
          </div>
        )}

        <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
              {participant.name}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2 justify-center lg:justify-start">
              <Badge size="sm" className="bg-blue-600 text-white text-xs sm:text-sm">
                {participant.role === 'manager' && 'Руководитель'}
                {participant.role === 'boardMember' && 'Член правления'}
                {participant.role === 'invited' && 'Приглашенный'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {participant.jobTitle && (
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-lg text-gray-700 break-words">{participant.jobTitle}</span>
              </div>
            )}

            {participant.organization && (
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-lg text-gray-700 break-words">{participant.organization}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}