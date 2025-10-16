import fastify from "fastify"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import formBody from "@fastify/formbody"
import { setupGlobalErrorHandlers } from "../package/setupGlobalErrorHandlers"
import dbService from "../package/db.service"
import config from "../config"
import { cheackJwtInHeader } from "../package/jwt.util"
import newsController from "../modules/news/news.controller"

const startServer = async () => {
  const server = fastify({ logger: true })
  await server.register(formBody)
  await server.register(fastifyJwt, {
    secret: config.JWT_SECRET,
    decoratorName: 'jwt'
  })
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  if (!server.jwt) throw new Error('JWT plugin not initialized')
  server.get('/api', async (_, reply) => reply.send({ msg: "pong" }))
  server.get('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.post('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.put('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.delete('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.get('/api/news', {
    handler: newsController.GET
  })
  server.post('/api/news', {
    preHandler: cheackJwtInHeader,
    handler: newsController.POST
  })
  server.put('/api/news', {
    preHandler: cheackJwtInHeader,
    handler: newsController.PUT
  })
  server.delete('/api/news/:_id', {
    preHandler: cheackJwtInHeader,
    handler: newsController.DELETE
  })

  try {
    setupGlobalErrorHandlers()
    await dbService.connect()
    await server.listen({
      port: config.PORT,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer()
.catch(err => {
  console.error('Server failed:', err)
  process.exit(1)
})