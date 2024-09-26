import { app } from '@/app'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { createOrgAndAuthenticate } from 'tests/create-org-and-authenticate'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createOrgAndAuthenticate(app)

    const createPetResponse = await supertest(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.animal.dog(),
        about: faker.lorem.paragraph(),
        age: faker.number.int().toString(),
        size: faker.helpers.arrayElement(['small', 'medium', 'large']),
        energyLevel: faker.helpers.arrayElement(['low', 'medium', 'high']),
        environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
        independenceLevel: faker.helpers.arrayElement([
          'low',
          'medium',
          'high',
        ]),
      })

    expect(createPetResponse.statusCode).toEqual(201)
  })
})
