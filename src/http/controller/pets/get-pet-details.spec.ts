import { app } from '@/app'
import supertest from 'supertest'
import { createOrgAndAuthenticate } from 'tests/create-org-and-authenticate'
import { makePet } from 'tests/factories/make-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet Details e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token } = await createOrgAndAuthenticate(app)

    const petData = makePet()

    const {
      body: { pet },
    } = await supertest(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(petData)

    const response = await supertest(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
