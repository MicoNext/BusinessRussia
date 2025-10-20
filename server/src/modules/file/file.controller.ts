import { FastifyRequest, FastifyReply } from 'fastify'
import fs from 'fs/promises'
import path from 'path'
import { ErrorUploadFile } from '../errors/errors'
import { errorResponse, successResponse } from '../../package/response.utils'
import mePaths from '../../package/mePaths'
import { cheackJwtInHeaderOrThrowError } from '../../package/jwt.util'
import config from '../../config'

class FileController {
  public async CREATE(req: FastifyRequest, reply: FastifyReply) {
    try {
      await cheackJwtInHeaderOrThrowError(req)
      const mepath = await mePaths("public")
      const data = await req.file()
      if (!data) {
        throw new ErrorUploadFile("Файл не был загружен")
      }
      const { filename, mimetype } = data
      const fileExt = path.extname(filename)
      const baseName = path.basename(filename, fileExt)
      const uniqueName = `${baseName}-${Date.now()}${fileExt}`
      const filePath = path.join(mepath, uniqueName)

      await fs.writeFile(filePath, await data.toBuffer())

      return successResponse("success", {
        message: "Файл успешно загружен",
        data: {
          filename: uniqueName,
          originalName: filename,
          mimetype,
          size: (await fs.stat(filePath)).size,
          url: `${config.ME_URL}/public/${uniqueName}`
        }
      }, reply)

    } catch (error) {
      return errorResponse(error, reply)
    }
  }

  public async DELETE(req: FastifyRequest<{ Params: { filename: string } }>, reply: FastifyReply) {
    try {
      await cheackJwtInHeaderOrThrowError(req)
      const mepath = await mePaths("public")
      const { filename } = req.params
      const filePath = path.join(mepath, filename)

      await fs.access(filePath)
      await fs.unlink(filePath)

      return successResponse("success", {
        message: "Файл успешно удален"
      }, reply)

    } catch (error) {
      return errorResponse(error, reply)
    }
  }
}

export default new FileController()