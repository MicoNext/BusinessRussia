import { FastifyReply, FastifyRequest } from "fastify"
import { Event } from "../../models/event"
import { errorResponse, successResponse } from "../../package/response.utils"
import { EventDocType } from "../../models/types"
import { paginate } from "../../package/paginate/paginate"

class EventController {
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
        Event,
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
  
        const result = await Event.findById(_id)
  
        return successResponse("success", {
          data: result,
        }, reply)
      } catch (e) {
        return errorResponse(e, reply)
      }
    }

  public async POST(req: FastifyRequest<{ Body: { data: Partial<EventDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Event.create(req.body.data) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async PUT(req: FastifyRequest<{ Params: { _id: string }, Body: { data: Partial<EventDocType> } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Event.updateOne({ _id: req.params._id }, { "$set": req.body.data }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }

  public async DELETE(req: FastifyRequest<{ Params: { _id: string } }>, reply: FastifyReply) {
    try {
      return successResponse("success", { data: await Event.deleteOne({ _id: req.params._id }) }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new EventController()
