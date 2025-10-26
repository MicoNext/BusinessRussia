import { Schema, model, Model } from 'mongoose'
import { CommitteeDocType } from './types'

const CommitteeSchema = new Schema<CommitteeDocType>({
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  html: { type: String, required: true },
  media: {
    imagesUrl: [{ type: String }],
    videoUrl: [{ type: String }],
  },
  participant: [
    { type: String }
  ]
})

interface ICommitteeModel extends Model<CommitteeDocType> {
}

class CommitteeService {
  public model = model<CommitteeDocType, ICommitteeModel>('Committee', CommitteeSchema)
}

export const Committee = new CommitteeService().model
