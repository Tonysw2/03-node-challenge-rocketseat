import type { IOrgsRepository } from '@/repositories/interfaces/orgs-repository-interface'
import type { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await compare(password, org.passwordHash)

    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
