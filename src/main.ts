import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ConfigService } from './shared/module/config/config.service'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('port')

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(port)

  logger.log(`🔥 Application is running on: ${await app.getUrl()}`)
}
bootstrap()
