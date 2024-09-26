import { app } from '@/app'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Auth e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await supertest(app.server).post('/register').send({
      name: faker.company.name(),
      authorName: faker.person.fullName(),
      email,
      password,
      whatsapp: faker.phone.number(),
      zipCode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      neighborhood: faker.location.streetAddress(),
      street: faker.location.street(),

      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    })

    const response = await supertest(app.server).post('/auth').send({
      email,
      password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
