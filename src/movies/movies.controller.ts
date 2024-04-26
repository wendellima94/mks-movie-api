import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthService } from '../auth/auth.service';
import { Movie } from './entities/movies.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  @Get(':id')
  private async findMovieById(@Param('id') id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: +id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() req,
  ): Promise<Movie> {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.user.id;

    const decodedToken = await this.authService.verifyToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    const user = await this.authService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const movie = new Movie();
    movie.title = createMovieDto.title;
    movie.director = createMovieDto.director;
    movie.description = createMovieDto.description;
    movie.first_aired = createMovieDto.first_aired;
    movie.genres = createMovieDto.genres;
    movie.original_title = createMovieDto.original_title;
    movie.overview = createMovieDto.overview;
    movie.poster_path = createMovieDto.poster_path;
    movie.contentType = createMovieDto.contentType;
    movie.user = user;

    return this.movieRepository.save(movie);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
    @Request() req,
  ): Promise<Movie> {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.user.id;

    const decodedToken = await this.authService.verifyToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie.title = updateMovieDto.title;
    movie.director = updateMovieDto.director;
    movie.description = updateMovieDto.description;
    movie.first_aired = updateMovieDto.first_aired;
    movie.genres = updateMovieDto.genres;
    movie.original_title = updateMovieDto.original_title;
    movie.overview = updateMovieDto.overview;
    movie.poster_path = updateMovieDto.poster_path;
    movie.contentType = updateMovieDto.contentType;

    return this.movieRepository.save(movie);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.user.id;

    const decodedToken = await this.authService.verifyToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.movieRepository.remove(movie);
  }

  private async findOneMovie(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: +id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
