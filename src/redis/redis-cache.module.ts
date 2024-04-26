import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisCacheRepository } from './redis-cache.repository';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'redis-13337.c283.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 13337,
        password: 'nZtghgUAxWADYFiVEXrbOXHLt9oSgZjl',
        onClientCreated(client) {
          client.on('error', (err) => {
            console.error('Redis error:', err);
          });
          client.on('ready', () => {
            console.log('Redis connected');
          });
        },
      },
    }),
  ],
  providers: [RedisCacheRepository],
  exports: [RedisCacheRepository],
})
export class CacheRedisModule {}
