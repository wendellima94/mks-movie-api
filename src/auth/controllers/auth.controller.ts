import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    const { username, password } = createUserDto;

    const user = await this.usersService.findByUsernameAndPassword(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = await this.authService.generateToken(user);
    return { token };
  }
}
