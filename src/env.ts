import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
})

const envParseResult = envSchema.safeParse(process.env)

if (envParseResult.error) {
  throw new Error('You must provide valid environment variables.')
}

export const env = envParseResult.data
