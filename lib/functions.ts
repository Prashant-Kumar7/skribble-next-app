
import { createClient } from "redis";
// export const redisClient = createClient();
import dotenv from "dotenv"

dotenv.config()

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

