import { JwtPayloadType } from './jwt-payload.type'

export type JwtRefreshPayloadType = JwtPayloadType & {
  refreshToken: string
}
