import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'

import { JwtPayloadType } from '@/module/identity/core/strategy/types/jwt-payload.type'
import { UserUnauthorizedException } from '@/module/identity/http/exception/user-unauthorized-exception'
import { ConfigService } from '@/shared/module/config/config.service'

import { AuthLoginDto } from './dto/auth-user-login.dto'
import { HashRefreshTokenDto } from './dto/hash-refresh-token.dto'
import { Tokens } from './type/tokens'
import { UserManagementService } from './user-management.service'

export const TOKEN_HAS_SALT = 10

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userManagementService: UserManagementService,
  ) {}

  async signIn(data: AuthLoginDto) {
    const { email, password } = data
    const user = await this.userManagementService.getUserByEmail(email)
    if (!user || (await user?.comparePassword(password)) === false) {
      throw new UserUnauthorizedException()
    }
    const { token, refreshToken } = await this.getTokenData({
      email: user.email,
      id: user.id,
    })

    await this.hashAndSaveRefreshToken({
      user,
      refreshToken,
    })

    return {
      token,
      refresh_token: refreshToken,
    }
  }

  private async getTokenData(data: JwtPayloadType): Promise<Tokens> {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(data, {
        secret: this.configService.getOrThrow('jwt.secret', { infer: true }),
        expiresIn: this.configService.getOrThrow('jwt.expires', {
          infer: true,
        }),
      }),
      await this.jwtService.signAsync(data, {
        secret: this.configService.getOrThrow('jwt.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('jwt.refreshExpires', {
          infer: true,
        }),
      }),
    ])
    return {
      token,
      refreshToken,
    }
  }

  async hashAndSaveRefreshToken({ user, refreshToken }: HashRefreshTokenDto) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, TOKEN_HAS_SALT)
    user.hashedRefreshToken = hashedRefreshToken
    await this.userManagementService.saveUser(user)
  }
}
