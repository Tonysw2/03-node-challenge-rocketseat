import { PetsRepository } from '@/repositories/pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PetsRepository()
  const useCase = new GetPetDetailsUseCase(petsRepository)

  return useCase
}
