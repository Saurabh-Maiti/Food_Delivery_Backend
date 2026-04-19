import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { MailService } from '../mail/mail.service';
import { EmailOtpDto } from './dto/emailOtp.dto';
import { PasswordResetRequestDto } from './dto/passwordResetRequest.dto';
import * as crypto from 'crypto';
import { PasswordResetDto } from './dto/passwordReset.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedEmailOtp = await bcrypt.hash(otp, 10);
    await this.mailService.sendOtp(otp, registerUserDto.email);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
      hashedEmailOtp: hashedEmailOtp,
    });

    return {
      message: 'Please check your email for the OTP to verify your account',
    };
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findEmail(loginUserDto.email);
    if (!user) {
      return {
        message: 'Email not found',
      };
    }
    if (!user.isEmailVerified) {
      return {
        message: 'Please verify your email before logging in',
      };
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return {
        message: 'Invalid password',
      };
    }
    return {
      message: 'Login successful',
    };
  }
  async verifyOtp(emailOtpDto: EmailOtpDto) {
    const user = await this.userService.findEmail(emailOtpDto.email);
    if (!user) {
      return {
        message: 'Email not found',
      };
    }
    const isOtpValid = await bcrypt.compare(
      emailOtpDto.otp,
      user.hashedEmailOtp,
    );
    if (!isOtpValid) {
      return {
        message: 'Invalid OTP',
      };
    }
    user.isEmailVerified = true;
    await this.userService.saveUser(user);
    return {
      message: 'Email verified successfully',
    };
  }
  async passwordResetRequest(passwordResetRequestDto: PasswordResetRequestDto) {
    const { email } = passwordResetRequestDto;
    const user = await this.userService.findEmail(email);
    if (!user) {
      return {
        message: 'Email not found',
      };
    }
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    user.hashedToken = hashedToken;
    await this.userService.saveUser(user);
    await this.mailService.sendPasswordResetToken(token, email);
    return {
      message: 'Password reset token sent to email',
    };
  }
  async passwordReset(passwordResetDto: PasswordResetDto) {
    const { email, token, newPassword } = passwordResetDto;
    const user = await this.userService.findEmail(email);
    if (!user) {
      return {
        message: 'Email not found',
      };
    }
    if (user.hashedToken != null) {
      const isTokenValid = await bcrypt.compare(token, user.hashedToken);
      if (!isTokenValid) {
        return {
          message: 'Invalid token',
        };
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.hashedToken = null;
      await this.userService.saveUser(user);
      return {
        message: 'Password reset successful',
      };
    }
  }
}
