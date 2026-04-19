import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userData: Partial<User>) {
    if (userData.email) {
      userData.email = userData.email.toLowerCase().trim();
    }
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }
  async findEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }
  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }
}
