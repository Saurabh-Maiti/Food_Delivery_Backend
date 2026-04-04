import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { EmailOtpDto } from './dto/emailOtp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('register')
    async registerUser(@Body()registerUserDto:RegisterUserDto){
        return await this.authService.registerUser(registerUserDto);
    }
    @Post('login')
    async loginUser(@Body()loginUserDto:LoginUserDto){
        return await this.authService.loginUser(loginUserDto);
    }
    @Post('verify-otp')
    async verifyOtp(@Body()emailOtpDto:EmailOtpDto){
        return await this.authService.verifyOtp(emailOtpDto)
    }
}
