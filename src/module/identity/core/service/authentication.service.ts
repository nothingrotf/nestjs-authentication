import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'

import { JwtPayloadType } from '@/module/identity/core/strategy/types/jwt-payload.type'
import { AccessDenied } from '@/module/identity/http/exception/access-denied-exception'
import { UserUnauthorizedException } from '@/module/identity/http/exception/user-unauthorized-exception'
import { ConfigService } from '@/shared/module/config/config.service'

import { AuthLoginDto } from './dto/auth-user-login.dto'
import { HashRefreshTokenDto } from './dto/hash-refresh-token.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
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

  async signIn(data: AuthLoginDto): Promise<Tokens> {
    const { email, password } = data
    const user = await this.userManagementService.getUserByEmail(email)
    if (!user || (await user?.comparePassword(password)) === false) {
      throw new UserUnauthorizedException()
    }
    const tokens = await this.createTokens({
      email: user.email,
      userId: user.id,
    })
    await this.saveRefreshToken({
      user,
      refreshToken: tokens.refreshToken,
    })
    return tokens
  }

  private async createTokens(data: JwtPayloadType): Promise<Tokens> {
    const [accesstoken, refreshToken] = await Promise.all([
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
      accesstoken,
      refreshToken,
    }
  }

  async saveRefreshToken({
    user,
    refreshToken,
  }: HashRefreshTokenDto): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, TOKEN_HAS_SALT)
    user.hashedRefreshToken = hashedRefreshToken
    await this.userManagementService.saveUser(user)
  }

  async refreshToken(data: RefreshTokenDto): Promise<Tokens> {
    const user = await this.userManagementService.getUserById(data.userId)
    if (!user || !user.hashedRefreshToken) {
      throw new AccessDenied()
    }
    const isRefreshTokenValid = await bcrypt.compare(
      data.refreshToken,
      user.hashedRefreshToken,
    )
    if (!isRefreshTokenValid) {
      throw new AccessDenied()
    }
    const tokens = await this.createTokens({
      userId: user.id,
      email: user.email,
    })
    await this.saveRefreshToken({
      user,
      refreshToken: tokens.refreshToken,
    })
    return tokens
  }

  async logout(userId: string): Promise<void> {
    const user = await this.userManagementService.getUserById(userId)
    if (!user) {
      throw new AccessDenied()
    }
    user.hashedRefreshToken = null
    await this.userManagementService.saveUser(user)
  }
}
