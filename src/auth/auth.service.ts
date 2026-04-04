import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { MailService } from '../mail/mail.service';
import { EmailOtpDto } from './dto/emailOtp.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly mailService:MailService
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const otp=Math.floor(100000 + Math.random() * 900000).toString();
    const hashedEmailOtp=await bcrypt.hash(otp,10);
    await this.mailService.sendOtp(otp,registerUserDto.email);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
      hashedEmailOtp:hashedEmailOtp,
    });

    return {
      message:"Please check your email for the OTP to verify your account"
    };
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const user=await this.userService.findEmail(loginUserDto.email);
    if(!user){
      return {
        message:"Email not found"
      }
    }
    if(!user.isEmailVerified){
      return {
        message:"Please verify your email before logging in"
      }
    }
    const isPasswordValid=await bcrypt.compare(loginUserDto.password,user.password);
    if(!isPasswordValid){
      return {
        message:"Invalid password"
      }
    }
    return {
      message:"Login successful"
    }
  }
  async verifyOtp(emailOtpDto:EmailOtpDto){
    const user=await this.userService.findEmail(emailOtpDto.email);
    if(!user){
      return {
        message:"Email not found"
      }
    }
    const isOtpValid=await bcrypt.compare(emailOtpDto.otp,user.hashedEmailOtp);
    if(!isOtpValid){
      return {
        message:"Invalid OTP"
      }
    }
    user.isEmailVerified=true;
    await this.userService.saveUser(user);
    return {
      message:"Email verified successfully"
    }
  }
}