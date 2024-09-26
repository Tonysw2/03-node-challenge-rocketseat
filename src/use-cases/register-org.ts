import type { IOrgsRepository } from '@/repositories/interfaces/orgs-repository-interface'
import type { Org } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { OrgAlreadyExistsError } from './error/org-already-exists-error'

interface RegisterUseCaseRequest {
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

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    name,
    email,
    password,
    authorName,
    whatsapp,
    zipCode,
    city,
    state,
    street,
    neighborhood,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orderExists = await this.orgsRepository.findByEmail(email)

    if (orderExists) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await bcryptjs.hash(password, 10)

    const org = await this.orgsRepository.create({
      name,
      email,
      passwordHash,
      authorName,
      whatsapp,
      zipCode,
      city,
      state,
      street,
      neighborhood,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
