import type { FastifyInstance } from 'fastify'
import { auth } from '../controller/auth'
import { register } from '../controller/orgs/register'
import { createPet } from '../controller/pets/create-pet'
import { getPetDetails } from '../controller/pets/get-pet-details'
import { searchPets } from '../controller/pets/search-pets'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/auth', auth)
  app.get('/pets/search', searchPets)

  // authorized routes
  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
  app.get('/pets/:petId', { onRequest: [verifyJWT] }, getPetDetails)
}
