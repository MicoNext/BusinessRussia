import { Schema, model, Model } from 'mongoose'
import { EventnDocType } from './types'

const EventSchema = new Schema<EventnDocType>({
  createdAt: { type: Date, default: Date.now },
  slug: { type: String, required: true },
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

interface IEventModel extends Model<EventnDocType> {
}

class EventService {
  public model = model<EventnDocType, IEventModel>('Event', EventSchema)
}

export const News = new EventService().model
