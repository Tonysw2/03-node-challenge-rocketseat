import { OrgAlreadyExistsError } from '@/use-cases/error/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
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

  const data = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  try {
    await registerUseCase.execute(data)

    reply.code(201)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      reply.code(400).send({ error: error.message })
    }

    throw error
  }
}
