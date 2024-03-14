import { Column, Entity } from 'typeorm'

import { Email } from '@/module/identity/core/value-object/email.value-object'
import { DefaultEntity } from '@/shared/module/persistence/typeorm/entity/default.entity'

@Entity('users')
export class User extends DefaultEntity<User> {
  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({
    type: 'varchar',
    transformer: {
      to(email: Email) {
        return email.getValue()
      },
      from(value) {
        return value
      },
    },
  })
  email: Email

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar', nullable: true })
  hashedRefreshToken: string
}
