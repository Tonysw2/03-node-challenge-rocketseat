import { app } from '@/app'
import supertest from 'supertest'
import { createOrgAndAuthenticate } from 'tests/create-org-and-authenticate'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by details', async () => {
    const { token, orgCity } = await createOrgAndAuthenticate(app)

    await Promise.all([
      supertest(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Ted',
          about: 'lorem ipsum dolor sit amet, consectetur',
          size: 'small',
          age: '1',
          energyLevel: 'low',
          independenceLevel: 'low',
          environment: 'indoor',
        }),
      supertest(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Thor',
          about: 'lorem ipsum dolor sit amet, consectetur',
          size: 'large',
          age: '4',
          energyLevel: 'high',
          independenceLevel: 'medium',
          environment: 'outdoor',
        }),
      supertest(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Iron',
          about: 'lorem ipsum dolor sit amet, consectetur',
          size: 'large',
          age: '10',
          energyLevel: 'high',
          independenceLevel: 'high',
          environment: 'outdoor',
        }),
    ])

    const response = await supertest(app.server).get('/pets/search').query({
      city: orgCity,
      energyLevel: 'high',
      environment: 'outdoor',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
