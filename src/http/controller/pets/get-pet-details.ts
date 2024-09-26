import { ResourceNotFound } from '@/use-cases/error/resource-not-found'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = paramsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute({ petId })

    reply.code(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      reply.code(404).send({ error: error.message })
    }

    throw error
  }
}
