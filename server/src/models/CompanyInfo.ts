import { Schema, model, Model } from 'mongoose'
import { CompanyInfoDocType } from './types'

const CompanyInfoSchema = new Schema<CompanyInfoDocType>({
	address: { type: String, required: false, default: null },
	phone: { type: String, required: false, default: null },
	email: { type: String, required: false, default: null },
	workingHours: { type: String, required: false, default: null },
	map: {
		ymapApiKey: { type: String, required: false, default: null },
		centerCoordinates: { type: String, required: false, default: null },
		zoomDefault: { type: String, required: false, default: null },
	},
	logo: {
		imageUrl: { type: String, required: false, default: null },
		alt: { type: String, required: false, default: null },
	},
	socialMedia: [{
		iconName: { type: String, required: true, enum: ["vk", "telegram", "youtube", "rutube", "whatsapp"] },
		href: { type: String, required: true },
		title: { type: String, required: false, default: null },
	}],
})

interface ICompanyInfoModel extends Model<CompanyInfoDocType> {
}

class CompanyInfoService {
	public model = model<CompanyInfoDocType, ICompanyInfoModel>('CompanyInfo', CompanyInfoSchema)

	async findOrCreate() {
		let info
		info = await this.model.findOne()
		if (!info) {
			info = await this.model.create({
				address: null,
				phone: null,
				email: null,
				workingHours: null,
				map: {
					ymapApiKey: null,
					centerCoordinates: null,
					zoomDefault: null,
				},
				logo: {
					imageUrl: null,
					alt: null,
				},
				socialMedia: [],
			})
		}
		return info
	}
}

export const CompanyInfo = new CompanyInfoService()
