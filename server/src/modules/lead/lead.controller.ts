import { FastifyReply, FastifyRequest } from "fastify"
import { errorResponse, successResponse } from "../../package/response.utils"
import { Lead } from "../../models/lead"
import { CompanyInfo } from "../../models/companyInfo"
import { Bot } from "grammy"
import { paginate } from "../../package/paginate/paginate"
import { LeadDocType } from "../../models/types"

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
        Lead,
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
  public async POST(req: FastifyRequest<{ Body: { data: LeadDocType } }>, reply: FastifyReply) {
    try {
      const { name, phone, comment, email } = req.body.data
      const result = await Lead.create({ name, phone, comment, email })
      const { tgBotToken, adminTgChatId } = await CompanyInfo.findOrCreate()
      if(tgBotToken && adminTgChatId) {
        try {
          await new Bot(tgBotToken).api.sendMessage(adminTgChatId, `Новая лид:\n\nИмя: ${name}\nТелефон: ${phone}\nпочта: ${email || ""}\nКомментарий: ${comment || ""}`)
        } catch (e) {
          console.error(`error send lead to tg at ${new Date().toDateString()}`)
        }
      }
      return successResponse("success", { data: result }, reply)
    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}

export default new EventController()
