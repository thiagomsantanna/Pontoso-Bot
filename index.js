const result = require('dotenv').config({ path: '.env' })
const dia = require('./utils/pegaDataHora.js');
const fbomDia = require('./utils/frasesBomDia.js');
const redis = require('./db/redisConnection');
const discord = require('./utils/pontoCommands');
const fs = require('fs');
const { Client, Intents, CommandInteractionOptionResolver, Message } = require('discord.js');
const { SlashCommandBuilder, SlashCommandAssertions } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// client.once('ready', async () => {
//     console.log('Ready!');

//     const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
//     //try to recieve the guilds my bot is in
//     const guilds = await client.guilds.fetch();
//     let guildsID = [];

//     guilds.forEach(gld => {
//         guildsID = [...guildsID, gld.id];
//     });

//     const commands = [
//         //new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.'),
//         new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.').addStringOption(option => 	option.setName('horario').setDescription('Coloca um horário especifíco caso desejado').setRequired(false)),
//         new SlashCommandBuilder().setName('esquecidoalmoco').setDescription('Pros esquecidos que esqueceram de bater o Almoço').addStringOption(option => 
//             option.setName('horario')
//             .setDescription('Horário no qual saiu para almoço,\n utilize o modelo => "00:00" com dois pontos')
//             .setRequired(true)),
//         new SlashCommandBuilder().setName('esqueci').setDescription('Pros esquecidos que esqueceram de bater o ponto').addStringOption(option => 
//             option.setName('horario')
//             .setDescription('Horário no qual deveria ter batido o ponto,\n utilize o modelo => "00:00" com dois pontos')
//             .setRequired(true))
//     ]
//         .map(command => command.toJSON());

//     guildsID.forEach(gldID => {
//         rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, gldID), { body: commands })
//             .then(() => console.log('Successfully registered application commands.'))
//             .catch(console.error);
//     })
// });

// client.on('guildCreate', async (guild) => {

//     const pontoChannel = await guild.channels.create('ponto', { type: 'text' });
//     // await pontoChannel.send('Recomendamos o uso do bot em um canal separado assim como esse, para evitar de poluir outros canais, porém, os comandos funcionaram em todos os canais sem problemas, sinta-se à vontade de usar a sua maneira!\n\n\nOs comandos para uso são:\n   `/ponto` - Para iniciar o ponto e utilize os emojis abaixo do Ponto para marcar os momentos de intervalo e saída do expediente. Também é possível passar um horário específico de ínicio do ponto utilizando a opção de `horário` junto do `/ponto`\n   /esquecidoalmoco - Pros esquecidos que esqueceram de bater o Almoço.\n  /esqueci - Pros esquecidos que esqueceram de bater o ponto.');

//     const test = {
//         title: "Obrigado por convidar o Pontoso ao seu servidor!",
//         color: 9515056,
//         description: "\n\nRecomendamos o uso do bot em um canal separado assim como esse para evitar de poluir outros canais e facilitar o uso, porém, os comandos funcionaram em todos os canais sem problemas, sinta-se à vontade de usar a sua maneira!\n\n\nOs comandos para uso são:\n\n   `/ponto` - Para iniciar o ponto e utilize os emojis abaixo do Ponto para marcar os momentos de intervalo e saída do expediente. Também é possível passar um horário específico de ínicio do ponto utilizando a opção de `horário` junto do `/ponto`.\n\n",
//         thumbnail: {
//                url: "https://i.pinimg.com/originals/d5/e8/88/d5e8885841aaf131b836fa4f955ac2fa.gif"
//    }
// }
//     await pontoChannel.send({ content: "@everyone", embeds: [test] });
// });

// client.on('messageCreate', async (mensagem) => {

//     const conteudoMensagem = mensagem.content.toLowerCase();
//     const horarioMensagem = new Date(mensagem.createdTimestamp).getHours();
//     const user = mensagem.author;
//     var deuBomdia = false;

//     if (horarioMensagem >= 11 && horarioMensagem <= 15) {

//         conteudoMensagem.includes('tard') && user.id == '247110573848788992' ? deuBomdia = true : deuBomdia = false;
//     }

//     deuBomdia ? mensagem.react('🤗') : deuBomdia = false;
// });


// client.on('messageReactionAdd', async (reaction, user) => {


//     if (reaction.partial) {

//         try {
//             await reaction.fetch();
//             console.log('coisei o coiso!!');

//         } catch (error) {
//             console.error('Error fetching reaction:', error);
//             // Return as `reaction.message.author` may be undefined/null
//             return;
//         }
//     }

//     if (reaction.emoji.name === '🍽') {
//         if (reaction.count === 2) {

//             if (reaction.message.content.includes('Intervalo')) {
//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()

//             } else if (reaction.message.interaction.user.id === user.id) {
//                 await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Intervalo`, fetchReply: true });
//             } else {

//                 let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

//                 try {
//                     for (const reaction of userReactions.values()) {
//                         await reaction.users.remove(user.id);
//                     }
//                 } catch (error) {
//                     console.error('Failed to remove reactions.');
//                 }

//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             }
//         }

//     } else if (reaction.emoji.name === '↩') {
//         if (reaction.count === 2) {

//             if (reaction.message.content.includes('Retorno')) {
//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             } else if (reaction.message.interaction.user.id === user.id) {
//                 await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Retorno`, fetchReply: true });
//             } else {

//                 let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

//                 try {
//                     for (const reaction of userReactions.values()) {
//                         await reaction.users.remove(user.id);
//                     }
//                 } catch (error) {
//                     console.error('Failed to remove reactions.');
//                 }

//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             }
//         }
//     } else if (reaction.emoji.name === '👋') {
//         if (reaction.count === 2) {

//             if (reaction.message.content.includes('Saída')) {
//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             } else if (reaction.message.interaction.user.id === user.id) {
//                 await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Saída`, fetchReply: true });

//             } else {
//                 let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

//                 try {
//                     for (const reaction of userReactions.values()) {
//                         await reaction.users.remove(user.id);
//                     }
//                 } catch (error) {
//                     console.error('Failed to remove reactions.');
//                 }

//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             }

//         }
//     } else if (reaction.emoji.name === '⛅') {

//         //adicionar verificação de horario de saida --> if (reaction.message.content.includes('Saída')) {
//         if (reaction.count === 2) {

//             if (reaction.message.interaction.user.id === user.id) {
//                 await reaction.message.channel.send({ content: `${fbomDia.mensagemDeBomDia()} <@${user.id}>`, fetchReply: true })
//                     .then(msgBd => setTimeout(() => {
//                         msgBd.delete()
//                     }, 5000));
//                 let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(reaction.message.interaction.user.id));

//                 try {
//                     for (const reaction of userReactions.values()) {
//                         await reaction.users.remove(user.id);
//                     }
//                 } catch (error) {
//                     console.error('Failed to remove reactions.');
//                 }

//             } else {
//                 let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

//                 try {
//                     for (const reaction of userReactions.values()) {
//                         await reaction.users.remove(user.id);
//                     }
//                 } catch (error) {
//                     console.error('Failed to remove reactions.');
//                 }

//                 await reaction.message.react('🤬')
//                 await reaction.message.reactions.cache.get('🤬').remove()
//             }
//         }
//     }

// });


// client.on('interactionCreate', async interaction => {

//     if (!interaction.isCommand()) return;

//     const { commandName } = interaction;

//     var dataHora = dia.pegaDataHora();

//     if (commandName === 'ponto') {
        

//         let horarioOption = interaction.options.getString('horario');

//         var pontoUsuario = await redis.getPontosDoUsuario(interaction.user.id);

//         if (pontoUsuario) {

//             let diaDoPonto = new Date(parseInt(pontoUsuario)).setHours(0, 0, 0, 0);
//             console.log(`dia do ponto -> ${new Date(diaDoPonto)}`);
//             let diaAtual = new Date().setHours(0, 0, 0, 0);

//             if (diaAtual > diaDoPonto) {
 
//                 if (horarioOption) {

//                     if (horarioOption.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
//                         dataHora = `${dia.pegaData()} - ${horarioOption}`;

//                         pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });
                        

//                         await pontoMessage.react('⛅');
//                         await pontoMessage.react('🍽');
//                         await pontoMessage.react('↩');
//                         await pontoMessage.react('👋');

//                         await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp);

//                         console.log(pontoMessage.id);
//                     } else {
//                         interaction.reply({ content: `Qualfoi! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n<@${interaction.user.id}>`, ephemeral: true });
//                     }

//                 } else {

//                     pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

//                     await pontoMessage.react('⛅');
//                     await pontoMessage.react('🍽');
//                     await pontoMessage.react('↩');
//                     await pontoMessage.react('👋');

//                     await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp);

//                     console.log(pontoMessage.id);
//                 }

//             } else {
//                 interaction.reply({ content: `>>> Mai é Zé dentro d\'água memo né, já bateu o ponto hoje mano.\n<@${interaction.user.id}>`, ephemeral: true });
//             }

//         } else {

//             if (horarioOption) {

//                 if (horarioOption.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
//                     dataHora = `${dia.pegaData()} - ${horarioOption}`;

//                     let pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

//                     //console.log(pontoMessage);
//                     await pontoMessage.react('⛅');
//                     await pontoMessage.react('🍽');
//                     await pontoMessage.react('↩');
//                     await pontoMessage.react('👋');

                    
//                     await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp, pontoMessage.content);

//                     console.log(pontoMessage.id);
//                 } else {
//                     interaction.reply({ content: `Qualfoi <@${interaction.user.id}>! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`, ephemeral: true });
//                 }

//             } else {

//                 // let pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });
//                 // await redis.salvaMessage(pontoMessage, interaction);

//                 const ponto = await discord.respondeOPonto(interaction, dataHora);
//                 discord.adicionaReacoes(ponto, ['⛅', '🍽', '↩', '👋']);

//                 console.log(ponto.id);
//             }

//         }

//     }


//     if (commandName == 'esqueci') {

        // let test = await redis.getChave('test');
        // var tt = JSON.parse(test);
        // let jooj = tt.pontoMessage;
        // //console.log(tt.pontoMessage);

        // const chnnlPonto = client.channels.cache.find(chnnl => chnnl.name == 'paracetamol');
        // //console.log(chnnlPonto);

        // /*
        // * adicionar um lastOrDefault pra pegar a ultima mensagem de ponto do usuario
        // */
        // const ponto = await chnnlPonto.messages.fetch();
        // await ponto.find(x => x.author.username == 'Pontoso').edit('fodase sexo');
        // console.log(ponto);
        //var ttttt = new Discord.Message(ponto, client);
        //var t = new Message(    ponto, client);
        //console.log(ponto);
        // if (ponto.partial) {
        //     console.log('partial');
        // } else {
        //     console.log('bem foda');
        // }
        //await ponto.edit('SEXOOOOOOOOOOOOOOOOOO');
        //client.channels.cache.;
        //client.channels.cache.
        //console.log(JSON.stringify(client.channels.cache.find(chnnl => chnnl.name == 'ponto')));

        // console.log(client.channels.cache.filter(chnnl => chnnl. == 'ponto'));
        // const channel = client.channels.cache.get("897925511714574346").messsages;

        // channel.messages.fetch({ limit: 100 }).then(messages => {
        //     console.log(`Received ${messages.size} messages`);
        //     //Iterate through the messages here with the variable "messages".
        //     console.log(messages[0]);
        //     //messages.forEach(message => console.log(message.content))
        //   })
//     }

// });

client.login(process.env.BOT_TOKEN);