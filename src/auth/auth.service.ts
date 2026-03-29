import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const user=await this.userService.findEmail(loginUserDto.email);
    if(!user){
      return {
        message:"Email not found"
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
}
