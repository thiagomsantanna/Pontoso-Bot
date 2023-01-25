const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    const { client } = interaction;
    client.commands = new Collection();

    const commandFiles = fs
      .readdirSync(path.resolve(__dirname, "../commands/"))
      .filter((file) => file.endsWith(".js") && file !== "index.js");

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction).catch(console.error);
  },
};
