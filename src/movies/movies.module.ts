import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movies.controller';
import { Movie } from './entities/movies.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { MovieService } from './movies.service';
import { CacheRedisModule } from 'src/redis/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    CacheRedisModule,
    AuthModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [],
})
export class MovieModule {}
