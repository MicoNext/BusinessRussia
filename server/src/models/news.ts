import { Schema, model, Model } from 'mongoose'
import type { INews } from "../../../package/types/models/news"
import { Document } from 'mongoose'


const NewsSchema = new Schema<INews & Document>({
  createdAt: { type: Date, default: Date.now },
})

interface INewsModel extends Model<INews & Document> {
}

class NewsService {
  public model = model<INews & Document, INewsModel>('News', NewsSchema)
}

export const News = new NewsService().model
