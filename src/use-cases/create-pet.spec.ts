import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OnlyOrgsCanRegisterPetError } from './error/only-orgs-can-register-pet-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    await orgsRepository.create({
      id: 'org-1',
      name: 'JS Org',
      authorName: 'anthony ribeiro',
      email: 'anthony@email.com',
      passwordHash: '123123123',
      whatsapp: '+55123123123',

      zipCode: '12312-312',
      city: 'Florianópilis',
      state: 'SC',
      street: 'Rua Aleatória',
      neighborhood: 'Bairro Aleatório',

      latitude: 0,
      longitude: 0,
    })

    const { pet } = await sut.execute({
      orgId: 'org-1',
      name: 'JS Pet',
      about: 'Happy puppy',
      age: 'Puppy',
      size: 'small',
      energyLevel: 'low',
      environment: 'indoor',
      independenceLevel: 'low',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'JS Pet',
      }),
    )
  })

  it('should not be able to create a pet without org', async () => {
    expect(() => {
      return sut.execute({
        orgId: 'inexistent-id',
        name: 'JS Pet',
        about: 'Happy puppy',
        age: 'Puppy',
        size: 'small',
        energyLevel: 'low',
        environment: 'indoor',
        independenceLevel: 'low',
      })
    }).rejects.toBeInstanceOf(OnlyOrgsCanRegisterPetError)
  })
})
