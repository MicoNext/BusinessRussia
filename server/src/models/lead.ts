import { Schema, model, Model } from 'mongoose'
import { LeadDocType } from './types'

const LeadSchema = new Schema<LeadDocType>({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false, default: null },
  comment: { type: String, required: false, default: null },
})

interface ILeadModel extends Model<LeadDocType> {
}

class LeadService {
  public model = model<LeadDocType, ILeadModel>('Lead', LeadSchema)
}

export const Lead = new LeadService().model
