import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '@/shared/module/config/config.service'

import { JwtPayloadType } from './types/jwt-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('jwt.secret', { infer: true }),
    })
  }

  public validate(payload: JwtPayloadType): JwtPayloadType | never {
    if (!payload.userId || !payload.email) {
      throw new UnauthorizedException()
    }

    return payload
  }
}
