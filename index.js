const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

const clima = require('./pegaClima');


var messages = [];
// intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
// intents: [Intents.FLAGS.GUILDS]
client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async mensagem => {

    var diaTodo = new Date().setHours(0, 0, 0, 0);
    var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    var minutes = new Date().getMinutes();
    var now = `${new Date().getHours()}:${minutes < 9 ? `0${minutes}` : minutes}`

    switch (mensagem.content) {

        case '/almoco':

            let _msgsDoUser_almoco = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser_almoco.reverse();

            let _msgPontoParaColocarAlmoco = _msgsDoUser_almoco.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarAlmoco) {
                dataUltimaMsg = new Date(_msgPontoParaColocarAlmoco.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

                if (diaTodo > dataUltimaMsg) {
                    await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
                }
                else {
                    await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
                    _msgPontoParaColocarAlmoco.pontoMessage.react('🍽');

                    await mensagem.delete();

                    console.log(_msgPontoParaColocarAlmoco.pontoMessage.id);
                }
            }
            else {
                await mensagem.channel.send('Vai pro almoço direto?')
                break;
            }

            break;
        case '/voltei':

            let _msgsDoUser_voltei = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser_voltei.reverse();

            let _msgPontoParaColocarRetorno = _msgsDoUser_voltei.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarRetorno) {
                dataUltimaMsg = new Date(_msgPontoParaColocarRetorno.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

                if (diaTodo > dataUltimaMsg) {
                    await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
                }
                else {
                    await _msgPontoParaColocarRetorno.pontoMessage.edit({ content: `${_msgPontoParaColocarRetorno.pontoMessage.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true });
                    _msgPontoParaColocarRetorno.pontoMessage.react('↩');

                    await mensagem.delete();

                    console.log(_msgPontoParaColocarRetorno.pontoMessage.id);
                }
            }
            else {
                await mensagem.channel.send('Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu')
                break;
            }

            break;
        case '/tchau':

            let _msgsDoUser = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser.reverse();

            let _msgPontoParaColocarSaida = _msgsDoUser.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarSaida) {
                dataUltimaMsg = new Date(_msgPontoParaColocarSaida.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

                if (diaTodo > dataUltimaMsg) {
                    await mensagem.channel.send('Esqueceu de bater o ponto né, bonitão?')
                }
                else {
                    await _msgPontoParaColocarSaida.pontoMessage.edit({ content: `${_msgPontoParaColocarSaida.pontoMessage.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });

                    _msgPontoParaColocarSaida.pontoMessage.react('👋');

                    await mensagem.delete();

                    console.log(_msgPontoParaColocarSaida.pontoMessage.id)
                }
            }
            else {
                await mensagem.channel.send('Nem chegou e já ta saindo fora?')
                await mensagem.author.send('https://www.youtube.com/watch?v=6qkVt3AywOk');
                break;
            }

            break;
    }
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    var minutes = new Date().getMinutes();
    var now = `${new Date().getHours()}:${minutes < 9 ? `0${minutes}` : minutes}`

    // function numeroAleatorio(max, min = 0) {
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    //var emojis = ['👺', '🤠', '🥳', '👻', '💩', '🐵', '🐲', '🦄', '🦧', '🐟', '🐉', '🐀', '🦥', '🦜', '🦚', '🤺', '🦆', '😎', '😙', '😚', '🥵', '😱', '🍒', '🍑', '🍌', '🌹', '🥀', '🛺', '🛹', '🦼', '🏎', '🪂', '🚀', '💞', '💕', '☯', '🛐', '㊗', '🉐', '🎑', '🎁', '🎀', '🎢', '🎭', '☎', '🔫', '🏹', '💸', '🗑', '🧬', '🛠', '🔐', '🔏', '🎷', '🎮', '🥊', '🎯', '🏆', '🧩', '🧸'];

    if (commandName === 'ponto') {

        pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${todaysDay} - ${now} Início`, fetchReply: true });

        let _firstUserMsg = [{ interaction, pontoMessage }];

        messages.push(Object.assign(..._firstUserMsg));

        //pontoMessage.react(emojis[numeroAleatorio(emojis.length)]);
        var climaHoje = await clima.pegaClimaRioPreto();
        pontoMessage.react(climaHoje);

        console.log(pontoMessage.id);
    }

    if (commandName == 'esquecipapa') {

        var almocoDoCara = interaction.options.getString('horario');

        if (almocoDoCara.includes(':')) {
            await interaction.reply({ content: 'êêêê.. oreiudo memo hein!', ephemeral: true});
            pontoMessage.edit({ content: `${pontoMessage.content}\n${todaysDay} - ${almocoDoCara} Intervalo`, fetchReply: true })
        }else{
            await interaction.reply({ content: 'O modelo de horas utilizado é => **00:00**\n Te manca oreião', ephemeral: true});
        }

    }

});

client.login(process.env.BOT_TOKEN);