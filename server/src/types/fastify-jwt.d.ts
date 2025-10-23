import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { secret: string }
    user: { secret: string }
  }
}