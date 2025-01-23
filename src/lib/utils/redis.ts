"use server";

import { Redis } from "ioredis";

declare global {
    var redisClient: Redis; // This must be a `var` and not a `let / const`
}

let cachedRedisClient: Redis = (global as any).redisClient;

if (!cachedRedisClient) {
    cachedRedisClient = (global as any).redisClient = null;
}

export async function initializeRedisClient() {
    if (cachedRedisClient) {
        return cachedRedisClient;
    }

    const redisClientConn = new Redis({
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    });
    const ping = await redisClientConn.ping();
    if (ping !== "PONG") {
        throw new Error("Redis connection failed");
    }
    console.log("Connected to Redis");
    cachedRedisClient = redisClientConn;
    return cachedRedisClient;
}
