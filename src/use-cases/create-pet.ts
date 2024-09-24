import type { IOrgsRepository } from '@/repositories/interfaces/orgs-repository-interface'
import type { IPetsRepository } from '@/repositories/interfaces/pets-repository-interface'
import type { Pet } from '@prisma/client'
import { OnlyOrgsCanRegisterPetError } from './error/only-orgs-can-register-pet-error'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  about: string
  size: string
  age: string
  energyLevel: string
  independenceLevel: string
  environment: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.orgId)

    if (!org) {
      throw new OnlyOrgsCanRegisterPetError()
    }

    const pet = await this.petsRepository.create(data)

    return {
      pet,
    }
  }
}
