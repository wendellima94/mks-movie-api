// create-movie.dto.ts
import { IsDate, IsString, IsArray, IsUrl, IsEnum } from 'class-validator';

export enum ContentType {
  MOVIE = 'movie',
  SHOW = 'show',
}

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  director: string;

  @IsString()
  description: string;

  @IsDate()
  first_aired: Date;

  @IsArray()
  genres: string[];

  @IsString()
  original_title: string;

  @IsString()
  overview: string;

  @IsUrl()
  poster_path: string;

  @IsEnum(ContentType)
  contentType: ContentType;
}
