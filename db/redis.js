const { createClient } = require("redis");

const redisClient = process.env.REDIS_URL
  ? createClient({ url: process.env.REDIS_URL })
  : createClient();

redisClient.on("error", (e) => console.error(e));
redisClient.on("connect", () =>
  console.log(`🔌 Redis connected on: ${process.env.REDIS_URL || "localhost"}`));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
