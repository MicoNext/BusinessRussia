import { Schema, model, Model } from 'mongoose'
import type { INews } from "../../../package/types/models/news"
import { Document } from 'mongoose'


const NewsSchema = new Schema<INews & Document>({
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

interface INewsModel extends Model<INews & Document> {
}

class NewsService {
  public model = model<INews & Document, INewsModel>('News', NewsSchema)
}

export const News = new NewsService().model
