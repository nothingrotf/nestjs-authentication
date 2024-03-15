import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from '@/module/identity/core/service/authentication.service'
import { Tokens } from '@/module/identity/core/service/type/tokens'
import { UserManagementService } from '@/module/identity/core/service/user-management.service'

import { AuthLoginInputDto } from './dto/auth-user-login.dto'
import { CreateUserInputDto } from './dto/create-user.dto'

@Controller('auth')
export class IdentityController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signUp(@Body() userData: CreateUserInputDto): Promise<void> {
    await this.userManagementService.createUser(userData)
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userData: AuthLoginInputDto): Promise<Tokens> {
    return await this.authService.signIn(userData)
  }
}
