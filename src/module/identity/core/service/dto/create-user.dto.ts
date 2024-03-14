import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  readonly lastName: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*?[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*?[!@#$%^&*])/, {
    message: 'Password must contain at least one special character',
  })
  readonly password: string
}
