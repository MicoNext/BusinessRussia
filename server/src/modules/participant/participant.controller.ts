import { FastifyReply, FastifyRequest } from "fastify"
import { Participant } from "../../models/participant"
import { errorResponse, successResponse } from "../../package/response.utils"
import { ParticipantDocType } from "../../models/types"
import { paginate } from "../../package/paginate/paginate"

class ParticipantController {
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
        Participant,
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

  public async GET_ID(req: FastifyRequest<{
    Params: { _id: string }, 
  }>, reply: FastifyReply) {
    try {
      const { _id } = req.params

      const result = await Participant.findById(_id)

      return successResponse("success", {
        data: result,
      }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async POST(req: FastifyRequest<{ Body: { data: Partial<ParticipantDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Participant.create(req.body.data) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Params: { _id: string }, Body: { data: Partial<ParticipantDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Participant.updateOne({ _id: req.params._id }, { "$set": req.body.data }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async DELETE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Participant.deleteOne({ _id: req.params._id }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new ParticipantController()
