import { FastifyReply, FastifyRequest } from "fastify"
import { News } from "../../models/news"
import { errorResponse, successResponse } from "../../package/response.utils"
import { INews } from "../../../../package/types/models/news"

class NewsController {
  public async GET(req: FastifyRequest<{ Querystring: { name?: string, sort?: { createdAt: 1 | -1 } } }>, reply: FastifyReply) {
    try {
      const dbPayload = { filter: { name: req.query.name }, sort: { createdAt: req.query.sort?.createdAt || -1 }  }
      const news = await News.find(dbPayload.filter).sort(dbPayload.sort)
      return successResponse("success", { news }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async POST(req: FastifyRequest<{ Body: { new: Partial<INews> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { new: await News.create(req.body.new) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Body: { new: Partial<INews> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { new: await News.updateOne(req.body.new) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
  
  public async DELETE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { new: await News.deleteOne({ _id: req.params._id }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new NewsController()