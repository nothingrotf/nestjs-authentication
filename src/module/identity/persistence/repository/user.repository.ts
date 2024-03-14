import { Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { User } from '@/module/identity/persistence/entity/user.entity'
import { DefaultTypeOrmRepository } from '@/shared/module/persistence/typeorm/repository/default-typeorm.repository'

@Injectable()
export class UserRepository extends DefaultTypeOrmRepository<User> {
  constructor(@Inject(DataSource) dataSource: DataSource) {
    super(User, dataSource)
  }
}
