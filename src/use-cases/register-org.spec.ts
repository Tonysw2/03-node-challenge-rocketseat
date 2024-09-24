import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './error/org-already-exists-error'
import { RegisterUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      name: 'org-1',
      authorName: 'anthony ribeiro',
      email: 'anthony@email.com',
      password: '123123123',
      whatsapp: '+55123123123',

      zipCode: '12312-312',
      city: 'Florianópilis',
      state: 'SC',
      street: 'Rua Aleatória',
      neighborhood: 'Bairro Aleatório',

      latitude: 0,
      longitude: 0,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('org-1')
  })

  it('should not be able to register with existent email', async () => {
    await sut.execute({
      name: 'org-1',
      authorName: 'anthony ribeiro',
      email: 'anthony@email.com',
      password: '123123123',
      whatsapp: '+55123123123',

      zipCode: '12312-312',
      city: 'Florianópilis',
      state: 'SC',
      street: 'Rua Aleatória',
      neighborhood: 'Bairro Aleatório',

      latitude: 0,
      longitude: 0,
    })

    expect(() => {
      return sut.execute({
        name: 'org-1',
        authorName: 'anthony ribeiro',
        email: 'anthony@email.com',
        password: '123123123',
        whatsapp: '+55123123123',

        zipCode: '12312-312',
        city: 'Florianópilis',
        state: 'SC',
        street: 'Rua Aleatória',
        neighborhood: 'Bairro Aleatório',

        latitude: 0,
        longitude: 0,
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
