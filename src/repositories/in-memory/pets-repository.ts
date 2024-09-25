import { randomUUID } from 'node:crypto'
import type { Pet, Prisma } from '@prisma/client'
import type {
  FindManyPetsParams,
  IPetsRepository,
} from '../interfaces/pets-repository-interface'
import type { InMemoryOrgsRepository } from './orgs-repository'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findMany({
    city,
    age,
    size,
    energyLevel,
    environment,
    independenceLevel,
  }: FindManyPetsParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (item) => item.city === city,
    )

    return this.items
      .filter((pet) => orgsByCity.some((org) => org.id === pet.orgId))
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) => (size ? pet.size === size : true))
      .filter((pet) => (energyLevel ? pet.energyLevel === energyLevel : true))
      .filter((pet) => (environment ? pet.environment === environment : true))
      .filter((pet) =>
        independenceLevel ? pet.independenceLevel === independenceLevel : true,
      )
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      orgId: data.orgId,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      createdAt: new Date(),
      environment: data.environment,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
    }

    this.items.push(pet)

    return pet
  }
}
