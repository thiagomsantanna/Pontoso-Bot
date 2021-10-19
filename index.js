const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
// intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
// intents: [Intents.FLAGS.GUILDS]
client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async mensagem => {

  var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  var now = `${new Date().getHours()}:${new Date().getMinutes()}`
  const canalId = '898614312933920790';

  switch (mensagem.content) {
    case '!cheguei':
      pontoMsg = await mensagem.reply({ content: `>>> ${todaysDay} - ${now} Início`, fetchReply: true });
      //message = await interaction.reply('dale').fetchReply();
      //console.log(interaction);
      console.log(pontoMsg.id);
      console.log(mensagem)
      console.log('\n')
      console.log(pontoMsg)

      break;
    case '!almoco':
      //interaction.fetchReply()
      // message = 
      //await interaction.reply(`${interaction.user.username} toma aqui essa coquinha gelada pra ti`)
      //canalId.send('sifoda').then(message => console.log(message));
      pontoMsg = await pontoMsg.edit({ content: `${pontoMsg.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
      //message = await message.edit({ content: `${message.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
      console.log(pontoMsg.id);

      break;
    case '!voltei':
      //await interaction.reply(`User info.\n ${interaction.user.avatar}\n\n\n ${interaction.user.avatarURL({})}`);
      //await interaction.reply(`${interaction.user.username} tá de buxin chei?`)
      pontoMsg = await pontoMsg.edit({ content: `${pontoMsg.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true });
      //await interaction.fetchMessage(message).then(message => console.log(`${message}`));
      console.log(pontoMsg.id);

      break;
    case '!tchau':
      pontoMsg = await pontoMsg.edit({ content: `${pontoMsg.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });
      console.log(pontoMsg.id)

      break;
  }

  //msg.react('👍');
  //msg.react('👎');
  //msg.react('😎');

  //console.log(filter);

  //console.log(mensagem);
});

// client.on('interactionCreate', async interaction => {

//   if (!interaction.isCommand()) return;

//   const { commandName } = interaction;

//   var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
//   var now = `${new Date().getHours()}:${new Date().getMinutes()}`
//   const canalId = '898614312933920790';

//   switch (commandName) {
//     case 'cheguei':
//       message = await interaction.reply({ content: `>>> ${todaysDay} - ${now} Início`, fetchReply: true });
//       //message = await interaction.reply('dale').fetchReply();
//       //console.log(interaction);
//       console.log(message.id);

//       break;
//     case 'almoco':
//       //interaction.fetchReply()
//       // message = 
//       //await interaction.reply(`${interaction.user.username} toma aqui essa coquinha gelada pra ti`)
//       canalId.send('sifoda').then(message => console.log(message));
//       // message = await interaction.editReply({content: `${message.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true});
//       //message = await message.edit({ content: `${message.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
//       //console.log(message.id);

//       break;
//     case 'voltei':
//       //await interaction.reply(`User info.\n ${interaction.user.avatar}\n\n\n ${interaction.user.avatarURL({})}`);
//       //await interaction.reply(`${interaction.user.username} tá de buxin chei?`)
//       await interaction.isCommand;
//       message = await message.edit({content: `${message.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true});
//       //await interaction.fetchMessage(message).then(message => console.log(`${message}`));
//       //console.log(message.id);

//       break;
//     case 'tchau':
//       message = await message.edit({ content: `${message.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });
//       console.log(message.id)

//       break;
//   }
// });

client.login(process.env.BOT_TOKEN);