import type { FastifyInstance } from 'fastify'
import { auth } from '../controller/auth'
import { register } from '../controller/orgs/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/auth', auth)
}
