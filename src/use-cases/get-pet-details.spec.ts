import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { makePet } from 'tests/factories/make-pet'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'

describe('Get Pet Details Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetDetailsUseCase

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create(makePet())

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
  })
})
