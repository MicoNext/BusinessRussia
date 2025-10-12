import fastify from "fastify"
import cors from "@fastify/cors"
import formBody from "@fastify/formbody"
import { setupGlobalErrorHandlers } from "../package/setupGlobalErrorHandlers"
import dbService from "../package/db.service"
import config from "../config"

const startServer = async () => {
  const server = fastify({ logger: true })
  await server.register(formBody)
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })

  server.get('/api', async (_, reply) => reply.send({ msg: "pong" }))
  server.get('/api/pong', async (_, reply) => reply.send({ msg: "pong" }))
  server.post('/api/pong', async (_, reply) => reply.send({ msg: "pong" }))
  server.put('/api/pong', async (_, reply) => reply.send({ msg: "pong" }))
  server.delete('/api/pong', async (_, reply) => reply.send({ msg: "pong" }))

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