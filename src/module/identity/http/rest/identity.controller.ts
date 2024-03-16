import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from '@/module/identity/core/service/authentication.service'
import { Tokens } from '@/module/identity/core/service/type/tokens'
import { UserManagementService } from '@/module/identity/core/service/user-management.service'
import { GetCurrentUser } from '@/module/identity/http/decorator/get-current-user.decorator'
import { GetCurrentUserId } from '@/module/identity/http/decorator/get-current-user-id.decorator'

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

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken({ userId, refreshToken })
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUserId() userId: string) {
    await this.authService.logout(userId)
  }
}
