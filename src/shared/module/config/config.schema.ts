import { z } from 'zod'

export const environmentSchema = z.enum(['test', 'development', 'production'])

export const databaseSchema = z.object({
  host: z.string(),
  database: z.string(),
  password: z.string(),
  port: z.coerce.number(),
  url: z.string().startsWith('postgresql://'),
  username: z.string(),
})

export const jwtSchema = z.object({
  secret: z.string().min(32),
  refreshSecret: z.string().min(32),
  expires: z.string(),
  refreshExpires: z.string(),
})

export const configSchema = z.object({
  env: environmentSchema,
  database: databaseSchema,
  jwt: jwtSchema,
  port: z.coerce.number(),
})
