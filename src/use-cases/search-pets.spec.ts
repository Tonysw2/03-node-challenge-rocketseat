import { app } from '@/app'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { makeOrg } from 'tests/factories/make-org'
import { makePet } from 'tests/factories/make-pet'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id }))
    await petsRepository.create(makePet({ orgId: org.id }))

    const { pets } = await sut.execute({
      city: org.city,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(petsRepository.items)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, age: '5' }))
    await petsRepository.create(makePet({ orgId: org.id, age: '10' }))

    const { pets: pets1 } = await sut.execute({
      city: org.city,
      age: '5',
    })

    expect(pets1).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: org.city,
      age: '10',
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, size: 'small' }))
    await petsRepository.create(makePet({ orgId: org.id, size: 'large' }))

    const { pets: pets1 } = await sut.execute({
      city: org.city,
      size: 'small',
    })

    expect(pets1).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: org.city,
      size: 'large',
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ orgId: org.id, environment: 'indoor' }),
    )
    await petsRepository.create(
      makePet({ orgId: org.id, environment: 'outdoor' }),
    )

    const { pets: pets1 } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets1).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: org.city,
      environment: 'outdoor',
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petsRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))

    const { pets: pets1 } = await sut.execute({
      city: org.city,
      energyLevel: 'low',
    })

    expect(pets1).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: org.city,
      energyLevel: 'high',
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and independence level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ orgId: org.id, independenceLevel: 'low' }),
    )
    await petsRepository.create(
      makePet({ orgId: org.id, independenceLevel: 'high' }),
    )

    const { pets: pets1 } = await sut.execute({
      city: org.city,
      independenceLevel: 'low',
    })

    expect(pets1).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: org.city,
      independenceLevel: 'high',
    })

    expect(pets2).toHaveLength(1)
  })
})
