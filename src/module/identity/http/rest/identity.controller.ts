import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { UserManagementService } from '@/module/identity/core/service/user-management.service'

import { CreateUserInputDto } from './dto/create-user.dto'

@Controller('auth')
export class IdentityController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signUp(@Body() userData: CreateUserInputDto) {
    await this.userManagementService.createUser(userData)
  }
}
