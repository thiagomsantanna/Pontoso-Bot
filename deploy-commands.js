const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const result = require('dotenv').config({ path: '.env' })

const commands = [
	new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.')//,
	// new SlashCommandBuilder().setName('almoco').setDescription('Marca o horário de Almoço.'),
	// new SlashCommandBuilder().setName('voltei').setDescription('Marca o horário de volta ao trabalho.'),
	// new SlashCommandBuilder().setName('tchau').setDescription('Marca o horário de saída')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);