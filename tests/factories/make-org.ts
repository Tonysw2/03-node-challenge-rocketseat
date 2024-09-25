import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

type Overwrite = {
  password?: string
  createdAt?: Date
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    name: faker.company.name(),
    authorName: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: overwrite?.password ?? faker.internet.password(),
    whatsapp: faker.phone.number(),
    createdAt: overwrite?.createdAt ?? new Date(),

    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),

    latitude: new Prisma.Decimal(faker.location.latitude().toString()),
    longitude: new Prisma.Decimal(faker.location.longitude().toString()),
  }
}
