import { app } from '@/app'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const authResponse = await supertest(app.server).post('/auth').send({
      email,
      password,
    })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error(
        'Cookies are undefined, expected to get Set-Cookie header.',
      )
    }

    const response = await supertest(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
