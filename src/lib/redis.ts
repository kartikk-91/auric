import "dotenv/config";
import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not defined");
}

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

export default redis;
