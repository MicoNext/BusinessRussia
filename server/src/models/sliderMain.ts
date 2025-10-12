import { Schema, model, Model, Document } from 'mongoose'
import type {ISliderMain } from "../../../package/types/models/sliderMain"

const sliderMainSchema = new Schema<ISliderMain & Document>({
  createdAt: { type: Date, default: Date.now },
})

interface ICliderModel extends Model<ISliderMain & Document> {
}

class SliderMainService {
  public model = model<ISliderMain & Document, ICliderModel>('SliderMain', sliderMainSchema)
}

export const SliderMain = new SliderMainService().model
