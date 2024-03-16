import { HttpStatus } from '@nestjs/common'

import { ApplicationException } from '@/shared/module/http/exception/application.exception'

export class AccessDenied extends ApplicationException {
  constructor() {
    super({
      HttpStatusCode: HttpStatus.FORBIDDEN,
      message: 'Access denied',
    })
  }
}
