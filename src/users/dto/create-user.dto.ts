import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string;
}
