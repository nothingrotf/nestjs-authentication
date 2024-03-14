import { Body, Controller, Post } from '@nestjs/common'

import { UserManagementService } from '@/module/identity/core/service/user-management.service'

import { CreateUserInputDto } from './dto/create-user.dto'

@Controller('auth')
export class IdentityController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('/signup')
  async signUp(@Body() userData: CreateUserInputDto) {
    const user = await this.userManagementService.createUser(userData)
    return user
  }
}
