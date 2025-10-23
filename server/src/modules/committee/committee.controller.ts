import { FastifyReply, FastifyRequest } from "fastify"
import { Committee } from "../../models/committee"
import { errorResponse, successResponse } from "../../package/response.utils"
import { CommitteeDocType } from "../../models/types"
import { paginate } from "../../package/paginate/paginate"

class CommitteeController {
  public async GET(req: FastifyRequest<{
    Querystring: {
      title: string,
      sort?: { createdAt: 1 | -1 },
      page?: number,
      limit?: number
    }
  }>, reply: FastifyReply) {
    try {
      const { sort, page, limit, title } = req.query

      const filter = title ? { title } : {}
      const sortOptions = sort ? { createdAt: sort.createdAt } : { createdAt: -1 }

      const result = await paginate(
        Committee,
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

  public async POST(req: FastifyRequest<{ Body: { data: Partial<CommitteeDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Committee.create(req.body.data) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Params: { _id: string }, Body: { data: Partial<CommitteeDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Committee.updateOne({ _id: req.params._id }, { "$set": req.body.data }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async DELETE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Committee.deleteOne({ _id: req.params._id }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new CommitteeController()