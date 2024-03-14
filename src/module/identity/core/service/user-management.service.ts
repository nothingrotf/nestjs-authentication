import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

import { Email } from '@/module/identity/core/value-object/email.value-object'
import { User } from '@/module/identity/persistence/entity/user.entity'
import { UserRepository } from '@/module/identity/persistence/repository/user.repository'

import { CreateUserDto } from './dto/create-user.dto'

export const PASSWORD_HAS_SALT = 10

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, PASSWORD_HAS_SALT)
    const newUser = new User({
      ...data,
      email: new Email(data.email),
      password: hashedPassword,
    })
    const user = await this.userRepository.insert(newUser)
    return user
  }
}
