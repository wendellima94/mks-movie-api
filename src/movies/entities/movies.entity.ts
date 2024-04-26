import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsString, IsArray, IsUrl, IsEnum } from 'class-validator';
import { ContentType } from '../dto/create-movie.dto';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  director: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({ type: 'date' })
  @IsDate()
  first_aired: Date;

  @Column('simple-array')
  @IsArray()
  genres: string[];

  @Column()
  @IsString()
  original_title: string;

  @Column({ type: 'text' })
  @IsString()
  overview: string;

  @Column()
  @IsUrl()
  poster_path: string;

  @Column({ type: 'enum', enum: ContentType })
  @IsEnum(ContentType)
  contentType: ContentType;

  @ManyToOne(() => User, user => user.movies, { onDelete: 'CASCADE' })
  user: User;
}
