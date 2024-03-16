import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '@/shared/module/config/config.service'

import { JwtPayloadType } from './types/jwt-payload.type'
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('jwt.refreshSecret', {
        infer: true,
      }),
      passReqToCallback: true,
    })
  }

  public validate(
    req: Request,
    payload: JwtPayloadType,
  ): JwtRefreshPayloadType | never {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    if (!refreshToken) {
      throw new UnauthorizedException()
    }

    return {
      ...payload,
      refreshToken,
    }
  }
}
