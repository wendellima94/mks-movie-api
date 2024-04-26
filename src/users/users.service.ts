import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RedisCacheRepository } from 'src/redis/redis-cache.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly redisCacheRepository: RedisCacheRepository,
  ) {}

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { username, password },
    });
    return user || null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    if (!isValidPassword(password)) {
      throw new BadRequestException('A senha deve ter pelo menos 8 caracteres e conter números e letras.');
    }

    const user = new User();
    user.id = uuidv4();
    user.username = username;
    user.email = email;
    user.password = password;

    const createdUser = await this.usersRepository.save(user);

    await this.redisCacheRepository.saveData(createdUser, createdUser.id);

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  @UseGuards(JwtAuthGuard) 
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.usersRepository.save(user);

    await this.redisCacheRepository.saveData(updatedUser, id);

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard) 
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.redisCacheRepository.deleteData(id);

    await this.usersRepository.remove(user);
  }
}

function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/;
  return passwordRegex.test(password);
}
