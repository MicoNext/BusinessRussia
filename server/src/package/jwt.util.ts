import { FastifyRequest } from "fastify"
import { ErrorNotAuth } from "../modules/errors/errors"

export const cheackJwtInHeader = async (req: any, reply: any, next: () => void) => {
    try {
        await req.jwtVerify({})
        next()
    } catch (e) {
        return reply.status(401).send({state: 'NOT AUTH', error: { message: "Не авторизован!" } })
    }
}

export const cheackJwtInHeaderOrThrowError = async (req: FastifyRequest) => {
    try {
        await req.jwtVerify()
    } catch (e) {
        throw new ErrorNotAuth("Не авторизован")
    }
}