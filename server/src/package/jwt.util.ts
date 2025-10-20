import { FastifyRequest } from "fastify"
import { ErrorNotAuth } from "../modules/errors/errors"
import { errorResponse } from "./response.utils"

export const cheackJwtInHeader = async (req: any, reply: any, next: () => void) => {
    try {
        await req.jwtVerify({})
    } catch (e) {
        return errorResponse(new ErrorNotAuth("Не авторизован!"), reply)
    }
}

export const cheackJwtInHeaderOrThrowError = async (req: FastifyRequest) => {
    try {
        await req.jwtVerify()
    } catch (e) {
        throw new ErrorNotAuth("Не авторизован")
    }
}