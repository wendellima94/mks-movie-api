import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { Movie } from 'src/movies/entities/movies.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(30, { message: 'Password must not exceed 30 characters' })
  password: string;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
