import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto).catch((err: any) => {
      console.log(err);
      switch (err.code) {
        case '23505': // Postgres Unique violation code.. This is a magic constant and should not be handled like this in production.
          throw new HttpException(
            {
              message: 'Email already taken',
            },
            HttpStatus.CONFLICT
          );
          break;
        default:
          throw err;
      }
    });
  }

  @Post('forgot')
  async forgot(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // TODO: Return a success message after sending a reset email to the user.
    return {
      message: `Ok! We sent you an email to ${forgotPasswordDto.email} with instructions`,
    };
  }
}
