import fastify from "fastify"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import formBody from "@fastify/formbody"
import cookie from "@fastify/cookie"
import fastifyStatic from '@fastify/static'
import fastifyMultipart from '@fastify/multipart'
import { setupGlobalErrorHandlers } from "../package/setupGlobalErrorHandlers"
import dbService from "../package/db.service"
import config from "../config"
import { cheackJwtInHeader } from "../package/jwt.util"
import newsController from "../modules/news/news.controller"
import AuthController from "../modules/auth/auth.controller"
import sliderMainController from "../modules/sliderMain/sliderMain.controller"
import mePaths from "../package/mePaths"
import fileController from "../modules/file/file.controller"
import committeeController from "../modules/committee/committee.controller"
import eventController from "../modules/event/event.controller"
import participantController from "../modules/participant/participant.controller"
import projectController from "../modules/project/project.controller"

const startServer = async () => {
  const server = fastify({ logger: true })
  await server.register(formBody)
  await server.register(cookie)
  await server.register(fastifyJwt, {
    secret: config.JWT_SECRET,
    decoratorName: 'jwt'
  })
  await server.register(fastifyMultipart, {
    attachFieldsToBody: false,
    limits: {
      fileSize: 500 * 1024 * 1024,
      files: 10
    }
  })
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', ],
    credentials: true
  })
  await server.register(fastifyStatic, {
    root: await mePaths("public"),
    prefix: "/api/public",
    decorateReply: false
  })

  if (!server.jwt) throw new Error('JWT plugin not initialized')
  const authController = new AuthController(server)
  server.get('/api', async (_, reply) => reply.send({ msg: "pong" }))
  server.get('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.post('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.put('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  server.delete('/api/ping', async (_, reply) => reply.send({ msg: "pong" }))
  
  server.post('/api/signin', {
    handler: authController.signin
  })

  server.post('/api/file', {
    handler: fileController.CREATE
  })
  server.delete('/api/file/:filename', {
    handler: fileController.DELETE
  })

  server.get('/api/news', {
    handler: newsController.GET
  })
  server.post('/api/news', {
    preHandler: cheackJwtInHeader,
    handler: newsController.POST
  })
  server.put('/api/news/:_id', {
    preHandler: cheackJwtInHeader,
    handler: newsController.PUT
  })
  server.delete('/api/news/:_id', {
    preHandler: cheackJwtInHeader,
    handler: newsController.DELETE
  })

  server.get('/api/slider-main', {
    handler: sliderMainController.GET
  })
  server.post('/api/slider-main', {
    preHandler: cheackJwtInHeader,
    handler: sliderMainController.POST
  })
  server.put('/api/slider-main/:_id', {
    preHandler: cheackJwtInHeader,
    handler: sliderMainController.PUT
  })
  server.delete('/api/slider-main/:_id', {
    preHandler: cheackJwtInHeader,
    handler: sliderMainController.DELETE
  })

  server.get('/api/committee', {
    handler: committeeController.GET
  })
  server.post('/api/committee', {
    preHandler: cheackJwtInHeader,
    handler: committeeController.POST
  })
  server.put('/api/committee/:_id', {
    preHandler: cheackJwtInHeader,
    handler: committeeController.PUT
  })
  server.delete('/api/committee/:_id', {
    preHandler: cheackJwtInHeader,
    handler: committeeController.DELETE
  })

  server.get('/api/event', {
    handler: eventController.GET
  })
  server.post('/api/event', {
    preHandler: cheackJwtInHeader,
    handler: eventController.POST
  })
  server.put('/api/event/:_id', {
    preHandler: cheackJwtInHeader,
    handler: eventController.PUT
  })
  server.delete('/api/event/:_id', {
    preHandler: cheackJwtInHeader,
    handler: eventController.DELETE
  })
  
  server.get('/api/participant', {
    handler: participantController.GET
  })
  server.post('/api/participant', {
    preHandler: cheackJwtInHeader,
    handler: participantController.POST
  })
  server.put('/api/participant/:_id', {
    preHandler: cheackJwtInHeader,
    handler: participantController.PUT
  })
  server.delete('/api/participant/:_id', {
    preHandler: cheackJwtInHeader,
    handler: participantController.DELETE
  })

  server.get('/api/project', {
    handler: projectController.GET
  })
  server.post('/api/project', {
    preHandler: cheackJwtInHeader,
    handler: projectController.POST
  })
  server.put('/api/project/:_id', {
    preHandler: cheackJwtInHeader,
    handler: projectController.PUT
  })
  server.delete('/api/project/:_id', {
    preHandler: cheackJwtInHeader,
    handler: projectController.DELETE
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
