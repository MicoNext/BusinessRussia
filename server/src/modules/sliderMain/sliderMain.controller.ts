import { FastifyReply, FastifyRequest } from "fastify"
import { errorResponse, successResponse } from "../../package/response.utils"
import type { SliderMainDocType } from "../../models/types"
import { paginate } from "../../package/paginate/paginate"
import { SliderMain } from "../../models/sliderMain"

class SliderMainController {
public async GET(req: FastifyRequest<{ 
  Querystring: { 
    title?: string, 
    sort?: { createdAt: 1 | -1 },
    page?: number,
    limit?: number
  } 
}>, reply: FastifyReply) {
  try {
    const { title, sort, page, limit } = req.query
    
    const filter = title ? { title } : {}
    const sortOptions = sort ? { createdAt: sort.createdAt } : { createdAt: -1 }

    const result = await paginate(
      SliderMain,
      filter,
      sortOptions, 
      { page, limit }
    )

    return successResponse("success", { 
      data: result.data,
      pagination: result.pagination
    }, reply)
  } catch (e) {
    return errorResponse(e, reply)
  }
}

  public async POST(req: FastifyRequest<{ Body: { data: Partial<SliderMainDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await SliderMain.create(req.body.data) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Params: {_id: string }, Body: { data: Partial<SliderMainDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await SliderMain.updateOne({ _id: req.params._id }, { "$set": req.body.data }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
  
  public async DELETE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await SliderMain.deleteOne({ _id: req.params._id }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new SliderMainController()