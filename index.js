const { Client, Intents } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);