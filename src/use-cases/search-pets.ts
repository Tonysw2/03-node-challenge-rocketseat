import type { IPetsRepository } from '@/repositories/interfaces/pets-repository-interface'
import type { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
  independenceLevel?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
    independenceLevel,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany({
      city,
      age,
      size,
      energyLevel,
      environment,
      independenceLevel,
    })

    return {
      pets,
    }
  }
}
