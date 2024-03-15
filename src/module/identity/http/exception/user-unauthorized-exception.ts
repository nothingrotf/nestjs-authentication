import { HttpStatus } from '@nestjs/common'

import { ApplicationException } from '@/shared/module/http/exception/application.exception'

export class UserUnauthorizedException extends ApplicationException {
  constructor() {
    super({
      HttpStatusCode: HttpStatus.UNAUTHORIZED,
      message: 'Cannot authorize user',
    })
  }
}
