// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CacheRedisModule } from 'src/redis/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheRedisModule],
  controllers: [UsersController],
  providers: [UsersService,],
  exports: [UsersService],
})
export class UsersModule {}
