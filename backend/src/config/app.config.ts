import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/restaurant_os',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  jwtSecret:
    process.env.JWT_SECRET || 'default_secret_key_change_in_production',
}));
