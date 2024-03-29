import { ConfigException } from './config.exception'
import { configSchema } from './config.schema'
import { Config } from './config.type'

export const factory = (): Config => {
  const result = configSchema.safeParse({
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      expires: process.env.JWT_EXPIRES,
      refreshExpires: process.env.JWT_REFRESH_EXPIRES,
    },
    database: {
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
    },
  })

  if (!result.success) {
    throw new ConfigException(
      `Invalid application configurations: ${result.error.message}`,
    )
  }

  return result.data
}
