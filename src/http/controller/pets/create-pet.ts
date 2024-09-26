import { OnlyOrgsCanRegisterPetError } from '@/use-cases/error/only-orgs-can-register-pet-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string().min(3),
    about: z.string(),
    size: z.enum(['small', 'medium', 'large']),
    age: z.string(),
    energyLevel: z.enum(['low', 'medium', 'high']),
    independenceLevel: z.enum(['low', 'medium', 'high']),
    environment: z.enum(['indoor', 'outdoor']),
  })

  const {
    name,
    about,
    size,
    age,
    energyLevel,
    environment,
    independenceLevel,
  } = bodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      orgId: request.user.sub,
      name,
      about,
      size,
      age,
      energyLevel,
      environment,
      independenceLevel,
    })

    reply.code(201)
  } catch (error) {
    if (error instanceof OnlyOrgsCanRegisterPetError) {
      reply.code(401).send({ error: error.message })
    }

    console.log(error)

    throw error
  }
}
