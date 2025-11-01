import { Users } from "lucide-react";
import { Badge } from '@/components/ui/Badge'

export function CommitteeInfo({ committee }: { committee: any }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
      <div className="space-y-3 sm:space-y-4">
        {committee.description && (
          <p className="text-base sm:text-lg text-blue-800 leading-relaxed">{committee.description}</p>
        )}
        
        {committee.participant && committee.participant.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-4 h-4" />
              Участники комитета ({committee.participant.length})
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {committee.participant.map((participant: string, index: number) => (
                <Badge key={index} size="sm" className="bg-blue-600 text-white text-xs">
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