const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config({ 
	path: '.env' 
})

const commands = [
	//new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.'),
	new SlashCommandBuilder()
		.setName('ponto')
		.setDescription('Marca o horário de Início de trabalho.')
		.addStringOption(option => 	option.setName('horario')
			.setDescription('Coloca um horário especifíco caso desejado')
			.setRequired(false)),
	new SlashCommandBuilder().setName('esquecidoalmoco').setDescription('Pros esquecidos que esqueceram de bater o Almoço').addStringOption(option => 
		option.setName('horario')
		.setDescription('Horário no qual saiu para almoço,\n utilize o modelo => "00:00" com dois pontos')
		.setRequired(true)),
	new SlashCommandBuilder().setName('esqueci').setDescription('Pros esquecidos que esqueceram de bater o ponto').addStringOption(option => 
		option.setName('horario')
		.setDescription('Horário no qual deveria ter batido o ponto,\n utilize o modelo => "00:00" com dois pontos')
		.setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID_SALESOFT), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(), { body: commands });