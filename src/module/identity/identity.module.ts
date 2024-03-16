import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { ConfigModule } from '@/shared/module/config/config.modules'

import { AuthService } from './core/service/authentication.service'
import { UserManagementService } from './core/service/user-management.service'
import { JwtStrategy } from './core/strategy/jwt.strategy'
import { JwtRefreshStrategy } from './core/strategy/jwt-refresh.strategy'
import { IdentityController } from './http/rest/identity.controller'
import { UserRepository } from './persistence/repository/user.repository'

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({})],
  providers: [
    UserManagementService,
    UserRepository,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [IdentityController],
})
export class IdentityModule {}
