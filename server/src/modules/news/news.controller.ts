import { FastifyReply, FastifyRequest } from "fastify"
import { News } from "../../models/news"
import { errorResponse, successResponse } from "../../package/response.utils"

class NewsController {
  public async GET(req: FastifyRequest, reply: FastifyReply) {
    try {
      const news = await News.find()
      return successResponse("success", { news }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async POST(req: FastifyRequest, reply: FastifyReply) {
    try {
      return successResponse("success", { }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest, reply: FastifyReply) {
    try {
      return successResponse("success", { }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
  
  public async DELETE(req: FastifyRequest, reply: FastifyReply) {
    try {
      return successResponse("success", { }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new NewsController()