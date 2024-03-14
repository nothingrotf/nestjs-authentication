import { Module } from '@nestjs/common'

import { IdentityModule } from './module/identity/identity.module'
import { User } from './module/identity/persistence/entity/user.entity'
import { ConfigModule } from './shared/module/config/config.modules'
import { TypeOrmPersistenceModule } from './shared/module/persistence/typeorm/typeorm-persistence.module'

@Module({
  imports: [
    IdentityModule,
    ConfigModule.forRoot(),
    TypeOrmPersistenceModule.forRootAsync({
      entities: [User],
      // migrations: ['database/shared/typeorm/migrations/*.{ts,js}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
