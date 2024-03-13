import { NestFactory } from '@nestjs/core'
import { DataSourceOptions } from 'typeorm'
import { createPostgresDatabase } from 'typeorm-extension'

import { AppModule } from '@/app.module'
import { ConfigService } from '@/shared/module/config/config.service'
import { TypeOrmMigrationService } from '@/shared/module/persistence/typeorm/service/typeorm-migration.service'

export const migrate = async () => {
  const migrationModule = await NestFactory.createApplicationContext(AppModule)
  migrationModule.init()
  const configService = migrationModule.get<ConfigService>(ConfigService)
  const options = {
    type: 'postgres',
    ...configService.get('database'),
  } as DataSourceOptions
  await createPostgresDatabase({
    ifNotExist: true,
    options,
  })
  await migrationModule.get(TypeOrmMigrationService).migrate()
}

export const getDataSource = async () => {
  const migrationModule = await NestFactory.createApplicationContext(AppModule)
  return migrationModule.get(TypeOrmMigrationService).getDataSource()
}
