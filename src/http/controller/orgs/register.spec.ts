import { app } from '@/app'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await supertest(app.server).post('/register').send({
      name: faker.company.name(),
      authorName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      whatsapp: faker.phone.number(),
      zipCode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      neighborhood: faker.location.streetAddress(),
      street: faker.location.street(),

      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    })

    expect(response.statusCode).toEqual(201)
  })
})
