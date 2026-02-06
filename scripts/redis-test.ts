import redis from "../src/lib/redis";

async function testRedis() {
  await redis.set("auric:test", "ok");
  const value = await redis.get("auric:test");
  console.log("Redis says:", value);
  process.exit(0);
}

testRedis();
