import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import bcryptjs from 'bcryptjs'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'org-1',
      authorName: 'anthony ribeiro',
      email: 'anthony@email.com',
      passwordHash: await bcryptjs.hash('123123123', 10),
      whatsapp: '+55123123123',

      zipCode: '12312-312',
      city: 'Florianópilis',
      state: 'SC',
      street: 'Rua Aleatória',
      neighborhood: 'Bairro Aleatório',

      latitude: 0,
      longitude: 0,
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const { org } = await sut.execute({
      email: 'anthony@email.com',
      password: '123123123',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'org-1',
      }),
    )
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => {
      return sut.execute({
        email: 'inexistent@email.com',
        password: '123123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    expect(() => {
      return sut.execute({
        email: 'anthony@email.com',
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
