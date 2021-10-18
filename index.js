const { Client, Intents } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // if (commandName === 'ping') {
  //   await interaction.reply('Pong!');
  // } else if (commandName === 'server') {
  //   await interaction.reply('Server info.');
  // } else if (commandName === 'user') {
  //   await interaction.reply('User info.');
  // }
  var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  var now = `${new Date().getHours()}:${new Date().getMinutes()}`
  //var message;

  switch (commandName) {
    case 'ping':
      message = await interaction.reply({ content: `>>> ${todaysDay} - ${now}`, fetchReply: true });//console.log(interaction.channelId)
      console.log(message.id);
      //console.log(interaction);
      //canalID = interaction.channelId;
      //console.log(canalID);
      break;
    case 'server':
      await interaction.reply('Server info.');
      message = await message.edit({ content: `${message.content}\n${todaysDay} - ${now}`, fetchReply: true });
      console.log(message.id);
      //let testt = await canalID.send('sifoda');
      //console.log(testt);
      //await interaction.send
      break;
    case 'user':
      await interaction.reply(`User info.\n ${interaction.user.avatar}\n\n\n ${interaction.user.avatarURL({})}`);
      break;
  }
});

client.login(process.env.BOT_TOKEN);