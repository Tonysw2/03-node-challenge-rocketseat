import type { FastifyInstance } from 'fastify'
import { register } from '../controller/orgs/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
}
