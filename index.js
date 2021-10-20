const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
var messages = [];
// intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
// intents: [Intents.FLAGS.GUILDS]
client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async mensagem => {

    var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    var minutes = new Date().getMinutes();
    var now = `${new Date().getHours()}:${minutes < 9 ? `0${minutes}` : minutes}`

    switch (mensagem.content) {

        case '/almoco':
            //messages.reverse();
            let _msgsDoUser_almoco = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser_almoco.reverse();
            //let _msgPontoParaColocarAlmoco = messages.find(fm => fm.interaction.user.id === mensagem.author.id);
            let _msgPontoParaColocarAlmoco = _msgsDoUser_almoco.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarAlmoco) {

                //_msg = await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
                await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
                //console.log(_msg);
                console.log('------------------');
                console.log(_msgPontoParaColocarAlmoco);
                //messages.push(_msg)
                console.log('------------------');
                console.log(messages);
                // try {
                //     _msg = await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
                //     messages.push(_msg)
                // } catch (error) {
                //     console.error();
                // }
            }
            else{
                mensagem.channel.send('Vai pro almoço direto?')
                break;
            }
            
            mensagem.delete();

            console.log(_msgPontoParaColocarAlmoco.pontoMessage.id);

            break;
        case '/voltei':
            
            //let _msgPontoParaColocarRetorno = messages.find(fm => fm.interaction.user.id === mensagem.author.id);
            let _msgsDoUser_voltei = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser_voltei.reverse();
            //let _msgPontoParaColocarAlmoco = messages.find(fm => fm.interaction.user.id === mensagem.author.id);
            let _msgPontoParaColocarRetorno = _msgsDoUser_voltei.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarRetorno) {
                //_msg = await _msgPontoParaColocarRetorno.pontoMessage.edit({ content: `${_msgPontoParaColocarRetorno.pontoMessage.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true });
                await _msgPontoParaColocarRetorno.pontoMessage.edit({ content: `${_msgPontoParaColocarRetorno.pontoMessage.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true });
                //messages.push(_msg)

                
            }
            else{
                mensagem.channel.send('Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu')

                break;
            }

            mensagem.delete();

            console.log(_msgPontoParaColocarRetorno.pontoMessage.id);

            break;
        case '/tchau':

            //let _msgPontoParaColocarSaida = messages.find(fm => fm.interaction.user.id === mensagem.author.id);
            let _msgsDoUser = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
            _msgsDoUser.reverse();
            //let _msgPontoParaColocarAlmoco = messages.find(fm => fm.interaction.user.id === mensagem.author.id);
            let _msgPontoParaColocarSaida = _msgsDoUser.find(last => last.interaction.user.id === mensagem.author.id);

            if (_msgPontoParaColocarSaida) {
                //_msg = await _msgPontoParaColocarSaida.pontoMessage.edit({ content: `${_msgPontoParaColocarSaida.pontoMessage.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });
                await _msgPontoParaColocarSaida.pontoMessage.edit({ content: `${_msgPontoParaColocarSaida.pontoMessage.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });
                //messages.push(_msg)
            }
            else{
                mensagem.channel.send('Nem chegou e já ta saindo fora?')
                mensagem.author.send('https://www.youtube.com/watch?v=6qkVt3AywOk');
                break;
            }

            mensagem.delete();
            // if (messages.length === 0) {
            //     mensagem.channel.send('Nem chegou e já ta saindo fora?')
            //     console.log(mensagem);
            //     mensagem.author.send('https://www.youtube.com/watch?v=6qkVt3AywOk');
            //     break;
            // }

            // messages = await messages.edit({ content: `${messages.content}\n${todaysDay} - ${now} Saída`, fetchReply: true });
            // mensagem.delete();

            console.log(_msgPontoParaColocarSaida.pontoMessage.id)

            break;
    }
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    var todaysDay = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    var minutes = new Date().getMinutes();
    var now = `${new Date().getHours()}:${minutes < 9 ? `0${minutes}` : minutes}`

    function numeroAleatorio(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var emojis = ['👺', '🤠', '🥳', '👻', '💩', '🐵', '🐲', '🦄', '🦧', '🐟', '🐉', '🐀', '🦥', '🦜', '🦚', '🤺', '🦆', '😎', '😙', '😚', '🥵', '😱', '🍒', '🍑', '🍌', '🌹', '🥀', '🛺', '🛹', '🦼', '🏎', '🪂', '🚀', '💞', '💕', '☯', '🛐', '㊗', '🉐', '🎑', '🎁', '🎀', '🎢', '🎭', '☎', '🔫', '🏹', '💸', '🗑', '🧬', '🛠', '🔐', '🔏', '🎷', '🎮', '🥊', '🎯', '🏆', '🧩', '🧸'];

    if (commandName === 'ponto') {

        pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${todaysDay} - ${now} Início`, fetchReply: true });
        //interaction.channel.send('fala willian!');
        let _firstUserMsg = [{interaction, pontoMessage}]
        ;

        messages.push(Object.assign( ..._firstUserMsg));

        pontoMessage.react(emojis[numeroAleatorio(emojis.length)]);

        console.log(pontoMessage.id);
    }
});

client.login(process.env.BOT_TOKEN);