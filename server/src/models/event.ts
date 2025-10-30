import { Schema, model, Model } from 'mongoose'
import { EventDocType } from './types'

const EventSchema = new Schema<EventDocType>({
  createdAt: { type: Date, default: Date.now },
  url: { type: String, required: true },
  title: { type: String, required: true },
  tags: [{ type: String }],
  html: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: false, default: null },
  location: { type: String, required: false, default: null },
  time: { type: String, required: false, default: null },
	category: { type: String, required: false, default: null },
})

interface IEventModel extends Model<EventDocType> {
}

class EventService {
  public model = model<EventDocType, IEventModel>('Event', EventSchema)
}

export const Event = new EventService().model
