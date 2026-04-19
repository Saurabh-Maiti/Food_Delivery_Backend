import { IsEmail, IsString } from 'class-validator';

export class EmailOtpDto {
  @IsEmail()
  email!: string;
  @IsString()
  otp!: string;
}
