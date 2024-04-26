import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return user || null;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
