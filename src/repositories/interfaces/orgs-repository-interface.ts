import type { Org, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  findById(orgId: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
