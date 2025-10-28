import { FastifyReply, FastifyRequest } from "fastify"
import { errorResponse, successResponse } from "../../package/response.utils"
import { CompanyInfoDocType } from "../../models/types"
import { CompanyInfo } from "../../models/companyInfo"

class EventController {
  public async GET(req: FastifyRequest, reply: FastifyReply) {
    try {
      const info = await CompanyInfo.findOrCreate()
      return successResponse("success", {
        data: info,
      }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Body: { data: Partial<CompanyInfoDocType> } }>, reply: FastifyReply) {
    try {
      const info = await CompanyInfo.findOrCreate()
      return successResponse("success", { data: await CompanyInfo.model.updateOne({ _id: info._id }, { "$set": {...req.body.data, _id: undefined } }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new EventController()
