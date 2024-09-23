import type { Org, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
