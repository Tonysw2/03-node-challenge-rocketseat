import { OrgsRepository } from '@/repositories/orgs-repository'
import { RegisterUseCase } from '../register-org'

export function makeRegisterUseCase() {
  const orgsRepository = new OrgsRepository()
  const useCase = new RegisterUseCase(orgsRepository)

  return useCase
}
