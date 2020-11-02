
import redis from 'redis';
import session from 'express-session';
import credis from 'connect-redis';

const RedisStore = credis(session);

export function conRedis(settings: any, redisConfig: any) {
    const redisClient = redis.createClient(redisConfig)
    settings.store = new RedisStore({ client: redisClient });

    return session(settings);
};