import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { EmailOtpDto } from './dto/emailOtp.dto';
import { PasswordResetRequestDto } from './dto/passwordResetRequest.dto';
import { PasswordResetDto } from './dto/passwordReset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerUser(registerUserDto);
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }
  @Post('verify-otp')
  async verifyOtp(@Body() emailOtpDto: EmailOtpDto) {
    return await this.authService.verifyOtp(emailOtpDto);
  }
  @Post('password-reset-request')
  async passwordResetRequest(@Body() passwordResetRequestDto: PasswordResetRequestDto){
    return await this.authService.passwordResetRequest(passwordResetRequestDto);
  }
  @Post('password-reset')
  async passwordReset(@Body()passwordResetDto:PasswordResetDto){
    return await this.authService.passwordReset(passwordResetDto);
  }
}
