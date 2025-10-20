import { Schema, model, Model } from 'mongoose'
import { SliderMainDocType } from './types'

export interface ISliderMain {
	sourse?: {
		url: string;
		buttonName: string;
	};
}

const sliderMainSchema = new Schema<SliderMainDocType>({
  createdAt: { type: Date, default: Date.now },
  type: { type: String, required: true, enum: ["img", "video"] },
  url: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: null },
  text: { type: String, required: false, default: null },
  tags: [
    { type: String }
  ],
  overlay: { type: Boolean, required: true, default: false },
  sourse: {
    url: { type: String, require: false, default: null },
    buttonName: { type: String, require: false, default: null },
  },
})

interface ISliderMainModel extends Model<SliderMainDocType> {
}

class SliderMainService {
  public model = model<SliderMainDocType, ISliderMainModel>('SliderMain', sliderMainSchema)
}

export const SliderMain = new SliderMainService().model
