const commands = require("../commands");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = Object.values(commands).map((c) => c.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

// rest
//   .put(
//     Routes.applicationGuildCommands(
//       process.env.CLIENT_ID,
//       process.env.GUILD_ID
//     ),
//     { body: commands }
//   )
//   .then(() => console.log("Successfully registered application commands."))
//   .catch(console.error);

rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.CUSTOM_GUILD_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
