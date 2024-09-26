import { faker } from '@faker-js/faker'
import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createOrgAndAuthenticate(app: FastifyInstance) {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const city = faker.location.city()

  await supertest(app.server).post('/register').send({
    name: faker.company.name(),
    authorName: faker.person.fullName(),
    email,
    password,
    whatsapp: faker.phone.number(),
    zipCode: faker.location.zipCode(),
    city,
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),

    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  })

  const authResponse = await supertest(app.server).post('/auth').send({
    email,
    password,
  })

  return {
    token: authResponse.body.token,
    orgCity: city,
  }
}
