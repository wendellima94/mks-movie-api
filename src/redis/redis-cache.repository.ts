import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveData<T>(data: T, key: string): Promise<void> {
    await this.redis.set(key, JSON.stringify(data), 'EX', 180);
  }

  async getData<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async deleteData(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
