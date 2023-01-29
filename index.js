require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});
const fs = require("fs");
const { Client } = require("discord.js");

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMessageReactions"],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.BOT_TOKEN);
