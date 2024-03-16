import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { JwtRefreshPayloadType } from '@/module/identity/core/strategy/types/jwt-refresh-payload.type'

export const GetCurrentUser = createParamDecorator(
  (
    key: keyof JwtRefreshPayloadType | undefined,
    context: ExecutionContext,
  ): JwtRefreshPayloadType => {
    const request = context.switchToHttp().getRequest()
    if (!key) return request.user
    return request.user[key]
  },
)
