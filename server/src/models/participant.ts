import { Schema, model, Model } from 'mongoose'
import { ParticipantDocType } from './types'

const ParticipantSchema = new Schema<ParticipantDocType>({
  createdAt: { type: Date, default: Date.now },
  media: {
    imagesUrl: [{ type: String }],
    videoUrl: [{ type: String }],
  },
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  organization: { type: String, required: false, default: null },
  role: { type: String, required: true, enum: ["manager", "boardMember", "invited"] },
  html: { type: String, required: true },
})

interface IParticipantModel extends Model<ParticipantDocType> {
}

class ParticipantService {
  public model = model<ParticipantDocType, IParticipantModel>('Participant', ParticipantSchema)
}

export const Participant = new ParticipantService().model
