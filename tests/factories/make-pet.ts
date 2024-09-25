import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import type { Pet } from '@prisma/client'

type Overwrite = {
  orgId?: string
  age?: string
  size?: string
  createdAt?: Date
  energyLevel?: string
  environment?: string
  independenceLevel?: string
}

export function makePet(overwrite?: Overwrite): Pet {
  return {
    id: randomUUID(),
    orgId: overwrite?.orgId ?? randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energyLevel:
      overwrite?.energyLevel ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['indoor', 'outdoor']),
    createdAt: overwrite?.createdAt ?? new Date(),
    independenceLevel:
      overwrite?.independenceLevel ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
  }
}
