import type { IOrgsRepository } from '@/repositories/interfaces/orgs-repository-interface'
import type { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  authorName: string
  whatsapp: string

  zipCode: string
  city: string
  state: string
  street: string
  neighborhood: string

  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute(
    data: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsRepository.create(data)

    return {
      org,
    }
  }
}
