import { OrgsRepository } from '@/repositories/orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new OrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
