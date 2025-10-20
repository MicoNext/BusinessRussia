import { Schema, model, Model } from 'mongoose'
import { ProjectDocType } from './types'

const ProjectSchema = new Schema<ProjectDocType>({
  createdAt: { type: Date, default: Date.now },
  slug: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  tags: [{ type: String }],
  media: {
    imagesUrl: [{ type: String }],
    videoUrl: [{ type: String }],
  },
  html: { type: String, required: true },
	category: { type: String, required: false, default: null },
  isBig: { type: Boolean, required: false, default: false },
})


interface IProjectModel extends Model<ProjectDocType> {
}

class ProjectService {
  public model = model<ProjectDocType, IProjectModel>('Project', ProjectSchema)
}

export const Project = new ProjectService().model

