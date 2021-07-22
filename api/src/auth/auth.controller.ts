import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
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
    return this.authService.signUp(signUpDto);
  }

  @Post('forgot')
  async forgot(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // TODO: Return a success message after sending a reset email to the user.
    return {
      message: `Ok! We sent you an email to ${forgotPasswordDto.email} with instructions`,
    };
  }
}
