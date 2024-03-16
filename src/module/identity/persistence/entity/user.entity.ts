import bcrypt from 'bcrypt'
import { Column, Entity } from 'typeorm'

import { DefaultEntity } from '@/shared/module/persistence/typeorm/entity/default.entity'

@Entity('users')
export class User extends DefaultEntity<User> {
  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar', nullable: true })
  hashedRefreshToken: string | null

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
