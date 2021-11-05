const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

const clima = require('./pegaClima');
const redis = require('./redis');


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
                    //await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
                    await mensagem.reply({ content: 'Esqueceu de bater o ponto hoje né, bonitão?', ephemeral: true});
                }
                else {
                    await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${todaysDay} - ${now} Intervalo`, fetchReply: true });
                    _msgPontoParaColocarAlmoco.pontoMessage.react('🍽');

                    await mensagem.delete();

                    console.log(_msgPontoParaColocarAlmoco.pontoMessage.id);
                }
            }
            else {
                //await mensagem.channel.send('Vai pro almoço direto?')
                await mensagem.reply({ content: 'Vai pro almoço direto?', ephemeral: true});
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
                    //await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
                    await mensagem.reply({ content: 'Esqueceu de bater o ponto hoje né, bonitão?', ephemeral: true});
                }
                else {
                    await _msgPontoParaColocarRetorno.pontoMessage.edit({ content: `${_msgPontoParaColocarRetorno.pontoMessage.content}\n${todaysDay} - ${now} Retorno`, fetchReply: true });
                    _msgPontoParaColocarRetorno.pontoMessage.react('↩');

                    await mensagem.delete();

                    console.log(_msgPontoParaColocarRetorno.pontoMessage.id);
                }
            }
            else {
                //await mensagem.channel.send('Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu');
                await mensagem.reply({ content: 'Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu', ephemeral: true});
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
                //await mensagem.channel.send('Nem chegou e já ta saindo fora?')
                await mensagem.reply({content: 'Nem chegou e já ta saindo fora?', ephemeral: true})
                await mensagem.author.send('https://www.youtube.com/watch?v=6qkVt3AywOk');
                break;
            }

            break;
    }
});

//variavel que salva a interaction timeStamp
var _interacoes = [];//1634592789 //1635718484860
//{ userID: '222090790627704832', horarioDia: 1635718484860 }
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

        var diaTodo = new Date().setHours(0, 0, 0, 0);

        var _interacao = { userID: interaction.user.id, horarioDia: interaction.createdTimestamp}
        console.log(_interacao);

        let _interacoesDoUser = _interacoes.filter(tm => tm.userID === interaction.user.id)
        console.log(_interacoesDoUser);
        _interacoesDoUser.reverse();

        let _ultimoPontoBatidoPeloUsuario = _interacoesDoUser.find(last => last.userID === interaction.user.id);
        

        if (_interacoesDoUser.length > 0) {

            _dataUltimoPonto = new Date(_ultimoPontoBatidoPeloUsuario.horarioDia).setHours(0, 0, 0, 0);
            
            console.log(_dataUltimoPonto);

            if (diaTodo > _dataUltimoPonto) {
                //interaction.reply({content: 'Bate o ponto ai cumade', ephemeral: true});
                interaction.channel.send('bom te ver denovo');

                pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${todaysDay} - ${now} Início`, fetchReply: true });
                
                _interacao = {_interacao, pontoMessage};
                console.log('*********************************')
                console.log(_interacao)
                
                let _firstUserMsg = [{ interaction, pontoMessage }];
                // _interacoes.push(Object.assign(..._firstUserMsg));
                _interacoes.push(_interacao);
                messages.push(Object.assign(..._firstUserMsg));
                redis.salvaMessage('daledaledaleputaqpariu');//Object.assign(..._firstUserMsg)
        
                //pontoMessage.react(emojis[numeroAleatorio(emojis.length)]);
                var climaHoje = await clima.pegaClimaRioPreto();
                pontoMessage.react(climaHoje);
        
                console.log(pontoMessage.id);
            } else {
                interaction.reply({ content: 'Ô oreia, vai bate o ponto duas vezes? isso daí pra mim é Hack.', ephemeral: true})
            }
        } else {

            pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${todaysDay} - ${now} Início`, fetchReply: true });
            
            //console.log(interaction);
            //console.log('\n\n')
            //console.log(pontoMessage);

            let _firstUserMsg = [{ interaction, pontoMessage }];
            // _interacoes.push(Object.assign(..._firstUserMsg));
            _interacoes.push(_interacao);
            messages.push(Object.assign(..._firstUserMsg));
            //let testRedisJson = Object.assign(..._firstUserMsg);
            //let messageRedisJson = JSON.stringify({interaction, pontoMessage});
            
            //console.log(messageRedisJson);
            redis.salvaMessage(pontoMessage, interaction);

            let test = await redis.getChave();
            // console.log('**************************')
            // console.log(test);
            interaction.channel.send(`\`\`\`json\n\n ${test}\`\`\``)
            

            //pontoMessage.react(emojis[numeroAleatorio(emojis.length)]);
            var climaHoje = await clima.pegaClimaRioPreto();
            pontoMessage.react(climaHoje);
            
    
            console.log(pontoMessage.id);
        }
 
    }

    if (commandName == 'esquecipapa') {

        //verificar se tem algo na variavel de interactions
        //se tiver faz certin
        //se não avisa que precisa bater o ponto
        let _mensagensDePontoDoUsuario = messages.filter(fm => fm.interaction.user.id === interaction.user.id);
        _mensagensDePontoDoUsuario.reverse();

        let _UltimaMsgDePonto = _mensagensDePontoDoUsuario.find(last => last.interaction.user.id === interaction.user.id);
        
        if (_UltimaMsgDePonto) {
            
            dataUltimaMsg = new Date(_UltimaMsgDePonto.pontoMessage.createdTimestamp).setHours(0,0,0,0);

            if(diaTodo > dataUltimaMsg) {
                await interaction.reply({ content: 'Pô esqueceu do ponto hoje Zé? ta marcando, usa o `/esqueciponto` ai vai', ephemeral: true})
            } else {
                var almocoDoCara = interaction.options.getString('horario');

                if (almocoDoCara.includes(':')) {
                    await interaction.reply({ content: 'êêêê.. oreiudo memo hein!', ephemeral: true});
                    pontoMessage.edit({ content: `${pontoMessage.content}\n${todaysDay} - ${almocoDoCara} Intervalo`, fetchReply: true })
                }else{
                    await interaction.reply({ content: 'O modelo de horas utilizado é => **00:00**\n Te manca oreião', ephemeral: true});
                }
            }
        } else {
            await interaction.reply({ content: 'Vai pro almoço direto?', ephemeral: true});
        }
    }

});

client.login(process.env.BOT_TOKEN);