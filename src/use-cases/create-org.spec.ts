import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { hash } from 'bcryptjs'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const password = await hash('123123123', 10)

    console.log(sut)

    const { org } = await sut.execute({
      name: 'org-1',
      authorName: 'anthony ribeiro',
      email: 'anthony@email.com',
      password,
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
})
