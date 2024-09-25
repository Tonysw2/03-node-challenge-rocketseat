import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { IOrgsRepository } from './interfaces/orgs-repository-interface'

export class OrgsRepository implements IOrgsRepository {
  async findById(orgId: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
