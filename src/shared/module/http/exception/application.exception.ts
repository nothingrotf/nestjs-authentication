import { HttpException, HttpStatus } from '@nestjs/common'

export type ApplicationExceptionParams = {
  message: string
  HttpStatusCode: HttpStatus
  context?: any
}

export class ApplicationException extends HttpException {
  readonly context?: any

  constructor(params: ApplicationExceptionParams) {
    super(params.message, params.HttpStatusCode)
    this.context = params.context
  }
}
