import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type {
  FindManyPetsParams,
  IPetsRepository,
} from './interfaces/pets-repository-interface'

export class PetsRepository implements IPetsRepository {
  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async findMany(params: FindManyPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: params.city,
        },

        AND: {
          age: params.age,
          size: params.size,
          energyLevel: params.energyLevel,
          environment: params.environment,
          independenceLevel: params.independenceLevel,
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
