import type { Pet, Prisma } from '@prisma/client'

export interface FindManyPetsParams {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
  independenceLevel?: string
}

export interface IPetsRepository {
  findMany(params: FindManyPetsParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
