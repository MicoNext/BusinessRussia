import { Schema, model, Model } from 'mongoose'
import { NewsDocType } from './types'


const NewsSchema = new Schema<NewsDocType>({
  createdAt: { type: Date, default: Date.now },
  slug: { type: String, required: true },
  media: {
    imagesUrl: [{ type: String }],
    videoUrl: [{ type: String }],
  },
	title: { type: String, required: true },
  tags: [{ type: String }],
  html: { type: String, required: true },
	category: { type: String, required: false, default: null },
})

interface INewsModel extends Model<NewsDocType> {
}

class NewsService {
  public model = model<NewsDocType, INewsModel>('News', NewsSchema)
}

export const News = new NewsService().model
