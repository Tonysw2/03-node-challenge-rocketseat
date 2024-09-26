import { PetsRepository } from '@/repositories/pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsUseCase() {
  const petsRepository = new PetsRepository()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}
