import { Column, Entity } from 'typeorm'

import { Email } from '@/module/identity/core/value-object/email.value-object'
import { DefaultEntity } from '@/shared/module/persistence/typeorm/entity/default.entity'

@Entity('users')
export class User extends DefaultEntity<User> {
  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: false })
  lastName: string

  @Column({ type: 'varchar', nullable: false })
  email: Email

  @Column({ type: 'varchar', nullable: false })
  hash: string

  @Column({ type: 'varchar', nullable: false })
  hashedRefreshToken: string
}
