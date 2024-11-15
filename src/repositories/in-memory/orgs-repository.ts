import { randomUUID } from 'node:crypto'
import { type Org, Prisma } from '@prisma/client'
import type { IOrgsRepository } from '../interfaces/orgs-repository-interface'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = []

  async findById(orgId: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === orgId)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      authorName: data.authorName,
      email: data.email,
      passwordHash: data.passwordHash,
      whatsapp: data.whatsapp,
      createdAt: new Date(),

      zipCode: data.zipCode,
      city: data.city,
      state: data.state,
      street: data.street,
      neighborhood: data.neighborhood,

      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
