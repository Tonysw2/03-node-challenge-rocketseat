import type { IPetsRepository } from '@/repositories/interfaces/pets-repository-interface'
import type { Pet } from '@prisma/client'
import { ResourceNotFound } from './error/resource-not-found'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFound()
    }

    return {
      pet,
    }
  }
}
