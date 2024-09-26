import type { FastifyInstance } from 'fastify'
import { auth } from '../controller/auth'
import { register } from '../controller/orgs/register'
import { createPet } from '../controller/pets/create-pet'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/auth', auth)

  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
}
