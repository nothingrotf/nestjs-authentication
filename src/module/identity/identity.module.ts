import { Module } from '@nestjs/common'

import { ConfigModule } from '@/shared/module/config/config.modules'

import { UserManagementService } from './core/service/user-management.service'
import { IdentityController } from './http/rest/identity.controller'
import { UserRepository } from './persistence/repository/user.repository'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [UserManagementService, UserRepository],
  controllers: [IdentityController],
})
export class IdentityModule {}
