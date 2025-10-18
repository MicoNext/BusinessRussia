import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign(payload: any, options?: any): string
      verify(secret: string): Promise<any>
    }
  }
  
  interface FastifyRequest {
    jwtVerify<T = { secret: string }>(): Promise<T>
  }
}

