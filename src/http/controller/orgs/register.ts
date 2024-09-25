import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    authorName: z.string(),
    whatsapp: z.string(),

    zipCode: z.string(),
    city: z.string(),
    state: z.string(),
    street: z.string(),
    neighborhood: z.string(),

    latitude: z.number(),
    longitude: z.number(),
  })

  const bodyParsed = registerBodySchema.parse(request.body)
}
