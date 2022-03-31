const redis = require("redis");
require("dotenv").config({ path: ".env" });

let client;

process.env.REDIS_URL
  ? (client = redis.createClient({ url: process.env.REDIS_URL }))
  : (client = redis.createClient());

client.on("error", (err) => {
  console.log("Error - " + err);
});

client.on("connect", () => {
  console.log("Conectado!");
});

module.exports = client;
