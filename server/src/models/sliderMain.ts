import { Schema, model, Model } from 'mongoose'
import { SliderMainDocType } from './types'

const sliderMainSchema = new Schema<SliderMainDocType>({
  createdAt: { type: Date, default: Date.now },
})

interface ICliderModel extends Model<SliderMainDocType> {
}

class SliderMainService {
  public model = model<SliderMainDocType, ICliderModel>('SliderMain', sliderMainSchema)
}

export const SliderMain = new SliderMainService().model
