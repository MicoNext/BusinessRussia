import { Schema, model, Model } from 'mongoose'
import { CompanyInfoDocType } from './types'

const CompanyInfoSchema = new Schema<CompanyInfoDocType>({
	about: {
		html: { type: String, required: false, default: null },
	},
	address: { type: String, required: false, default: null },
	email: { type: String, required: false, default: null },
	phone: { type: String, required: false, default: null },
	whatsappUrl: { type: String, required: false, default: null },
	maxUrl: { type: String, required: false, default: null },
	telegramUrl: { type: String, required: false, default: null },
	vkUrl: { type: String, required: false, default: null },
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
				about: {
					html: null
				}
			})
		}
		return info
	}
}

export const CompanyInfo = new CompanyInfoService()
