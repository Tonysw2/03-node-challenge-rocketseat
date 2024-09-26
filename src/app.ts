import { faker } from '@faker-js/faker'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.code(400).send({
      message: 'Validation error',
      error: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here we should log to an external tool like Sentry/DataDog/NewRelic
  }

  reply.code(500).send({ error: 'Internal Server Error' })
})

console.log(
  JSON.stringify({
    name: faker.company.name(),
    authorName: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    whatsapp: faker.phone.number(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),

    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  }),
)
