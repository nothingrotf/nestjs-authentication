import { Module } from '@nestjs/common'

import { ConfigModule } from './shared/module/config/config.modules'
import { TypeOrmPersistenceModule } from './shared/module/persistence/typeorm/typeorm-persistence.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmPersistenceModule.forRootAsync({
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
