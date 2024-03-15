import { User } from '@/module/identity/persistence/entity/user.entity'

export class HashRefreshTokenDto {
  refreshToken: string
  user: User
}
