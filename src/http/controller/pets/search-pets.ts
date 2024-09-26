import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    environment: z.enum(['indoor', 'outdoor']).optional(),
    energyLevel: z.enum(['low', 'medium', 'high']).optional(),
    independenceLevel: z.enum(['low', 'medium', 'high']).optional(),
  })

  const { city, age, size, environment, energyLevel, independenceLevel } =
    querySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    environment,
    energyLevel,
    independenceLevel,
  })

  reply.code(200).send({
    pets,
  })
}
