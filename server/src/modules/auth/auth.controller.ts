import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import dotenv from "dotenv"
import { ErrorBadRequest, ErrorNotAuth } from '../errors/errors'
import { errorResponse } from '../../package/response.utils'
import config from '../../config'
dotenv.config()

export default class AuthController {

  private server: FastifyInstance

  constructor(server: FastifyInstance) {
    this.server = server
  }

  async signin(req: FastifyRequest<{ Body: { login: string, password: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const { login, password } = req.body

      if (!login || !password) throw new ErrorBadRequest("Неверный логин или пароль")

      if (
        config.ADMIN_LOGIN !== login ||
        config.ADMIN_PASSWORD !== password
      ) {
        throw new ErrorNotAuth("Неверный логин или пароль")
      }

      const access = req.server.jwt.sign({ secret: login }, { expiresIn: "30d" })
      const refresh = req.server.jwt.sign({ secret: login }, { expiresIn: "69d" })

      return reply
        .setCookie('refreshToken', refresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 69 * 24 * 60 * 60
        })
        .status(200)
        .send({
          status: 'success',
          auth: true,
          accessToken: access,
          refreshToken: refresh
        })

    } catch (e) {
      return errorResponse(e, reply)
    }
  }
}
