import { randomUUID } from 'node:crypto'
import type { Pet, Prisma } from '@prisma/client'
import type { IPetsRepository } from '../interfaces/pets-repository-interface'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

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
