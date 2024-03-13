import { DomainException } from '@/shared/module/core/exception/domain.exception'

export class InvalidEmailException extends DomainException {
  constructor() {
    super('Invalid email address')
  }
}
