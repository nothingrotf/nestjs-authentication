import { User } from '@/module/identity/persistence/entity/user.entity'

export type JwtPayloadType = Pick<User, 'email'> & {
  userId: string
}
