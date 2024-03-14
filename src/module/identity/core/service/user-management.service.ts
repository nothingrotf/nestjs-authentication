import { HttpStatus, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

import { User } from '@/module/identity/persistence/entity/user.entity'
import { UserRepository } from '@/module/identity/persistence/repository/user.repository'
import { ApplicationException } from '@/shared/module/http/exception/application.exception'

import { CreateUserDto } from './dto/create-user.dto'

export const PASSWORD_HAS_SALT = 10

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: { email: data.email },
    })
    if (userExist) {
      throw new ApplicationException({
        HttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User already exist with this email.',
      })
    }
    const hashedPassword = await bcrypt.hash(data.password, PASSWORD_HAS_SALT)
    const newUser = new User({
      ...data,
      password: hashedPassword,
    })
    const user = await this.userRepository.insert(newUser)
    return user
  }
}
