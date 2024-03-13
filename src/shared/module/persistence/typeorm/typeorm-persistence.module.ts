import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@/shared/module/config/config.modules'
import { ConfigService } from '@/shared/module/config/config.service'

import { DefaultEntity } from './entity/default.entity'

@Module({})
export class TypeOrmPersistenceModule {
  static forRootAsync(options: {
    entities?: Array<typeof DefaultEntity>
  }): DynamicModule {
    return {
      module: TypeOrmPersistenceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: (...args: any[]) => {
            const configService: ConfigService = args.find(
              (arg) => arg instanceof ConfigService,
            )
            return {
              type: 'postgres',
              logging: false,
              ...configService.get('database'),
              ...options,
            }
          },
        }),
      ],
    }
  }
}
