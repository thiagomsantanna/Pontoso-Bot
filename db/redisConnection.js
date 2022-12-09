const redis = require("redis");
const { promisify } = require("util");

const client = process.env.REDIS_URL
  ? redis.createClient({ url: process.env.REDIS_URL })
  : redis.createClient();

client.get = promisify(client.get).bind(client);
client.set = promisify(client.set).bind(client);
client.del = promisify(client.del).bind(client);

module.exports = client;

client.on("error", (err) => {
  throw err;
});

client.on("connect", () => {
  console.log("Redis Connected!");
});
