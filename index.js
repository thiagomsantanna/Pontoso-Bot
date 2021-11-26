const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const result = require('dotenv').config({ path: '.env' })
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const dia = require('./pegaDataHora.js');
const fbomDia = require('./frasesBomDia.js');

var messages = [];
// intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
// intents: [Intents.FLAGS.GUILDS]
client.once('ready', () => {
    console.log('Ready!');
});

// client.on('messageCreate', async (mensagem, user) => {

//     // console.log(mensagem.createdAt);
//     // console.log(mensagem.createdAt.getDay());
//     // console.log(mensagem.createdTimestamp);

//     if (mensagem.content == 'Bom dia' && mensagem.createdAt.getDay() == 4) {


//         // await mensagem.channel.send({content: 'DALE', fetchReply: true})
//         //     .then(dale =>  setTimeout(() => { 
//         //         dale.delete()
//         //     }, 3000), dale.channel.send({content: 'DALE', fetchReply: true}));;

//         // await mensagem.channel.send({ content: 'DALE', fetchReply: true })
//         //     .then(async d => {
//         //         await d.delete()
//         //         await d.channel.send({ content: 'DALE', fetchReply: true })
//         //             .then(async da => {
//         //                 await da.delete();
//         //                 await da.channel.send({ content: 'PUTA', fetchReply: true })
//         //                     .then(async dal => {
//         //                         await dal.delete();
//         //                         await dal.channel.send({ content: 'QUE', fetchReply: true })
//         //                             .then(async dale => {
//         //                                 await dale.delete();
//         //                                 await dale.channel.send({ content: 'PARIU', fetchReply: true })
//         //                                     .then(async daled => {
//         //                                         await daled.delete();
//         //                                         await daled.channel.send({ content: 'É O ÚLTIMO GÁS KARAI', fetchReply: true })
//         //                                             .then(async daleda => {
//         //                                                 setTimeout(() => {
//         //                                                     daleda.delete();
//         //                                                 }, 3000);
//         //                                             })
//         //                                     });
//         //                             })
//         //                     })
//         //             })
//         //     })

//     }
//     // var diaTodo = new Date().setHours(0, 0, 0, 0);
//     // var dataHora = dia.pegaDataHora();

//     // switch (mensagem.content) {

//     //     case '/almoco':

//     //         let _msgsDoUser_almoco = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
//     //         _msgsDoUser_almoco.reverse();

//     //         let _msgPontoParaColocarAlmoco = _msgsDoUser_almoco.find(last => last.interaction.user.id === mensagem.author.id);

//     //         if (_msgPontoParaColocarAlmoco) {
//     //             dataUltimaMsg = new Date(_msgPontoParaColocarAlmoco.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

//     //             if (diaTodo > dataUltimaMsg) {
//     //                 //await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
//     //                 await mensagem.reply({ content: 'Esqueceu de bater o ponto hoje né, bonitão?', ephemeral: true });
//     //             }
//     //             else {
//     //                 await _msgPontoParaColocarAlmoco.pontoMessage.edit({ content: `${_msgPontoParaColocarAlmoco.pontoMessage.content}\n${dataHora} Intervalo`, fetchReply: true });
//     //                 _msgPontoParaColocarAlmoco.pontoMessage.react('🍽');

//     //                 await mensagem.delete();

//     //                 console.log(_msgPontoParaColocarAlmoco.pontoMessage.id);
//     //             }
//     //         }
//     //         else {
//     //             //await mensagem.channel.send('Vai pro almoço direto?')
//     //             await mensagem.reply({ content: 'Vai pro almoço direto?', ephemeral: true });
//     //             break;
//     //         }

//     //         break;
//     //     case '/voltei':

//     //         let _msgsDoUser_voltei = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
//     //         _msgsDoUser_voltei.reverse();

//     //         let _msgPontoParaColocarRetorno = _msgsDoUser_voltei.find(last => last.interaction.user.id === mensagem.author.id);

//     //         if (_msgPontoParaColocarRetorno) {
//     //             dataUltimaMsg = new Date(_msgPontoParaColocarRetorno.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

//     //             if (diaTodo > dataUltimaMsg) {
//     //                 //await mensagem.channel.send('Esqueceu de bater o ponto hoje né, bonitão?');
//     //                 await mensagem.reply({ content: 'Esqueceu de bater o ponto hoje né, bonitão?', ephemeral: true });
//     //             }
//     //             else {
//     //                 await _msgPontoParaColocarRetorno.pontoMessage.edit({ content: `${_msgPontoParaColocarRetorno.pontoMessage.content}\n${dataHora} Retorno`, fetchReply: true });
//     //                 _msgPontoParaColocarRetorno.pontoMessage.react('↩');

//     //                 await mensagem.delete();

//     //                 console.log(_msgPontoParaColocarRetorno.pontoMessage.id);
//     //             }
//     //         }
//     //         else {
//     //             //await mensagem.channel.send('Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu');
//     //             await mensagem.reply({ content: 'Voltou da onde? Nem almoçou direito meu fi, calmai que vovó vai fazer um bolinho pra vc viu', ephemeral: true });
//     //             break;
//     //         }

//     //         break;
//     //     case '/tchau':

//     //         let _msgsDoUser = messages.filter(fm => fm.interaction.user.id === mensagem.author.id);
//     //         _msgsDoUser.reverse();

//     //         let _msgPontoParaColocarSaida = _msgsDoUser.find(last => last.interaction.user.id === mensagem.author.id);

//     //         if (_msgPontoParaColocarSaida) {
//     //             dataUltimaMsg = new Date(_msgPontoParaColocarSaida.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

//     //             if (diaTodo > dataUltimaMsg) {
//     //                 await mensagem.channel.send('Esqueceu de bater o ponto né, bonitão?')
//     //             }
//     //             else {
//     //                 await _msgPontoParaColocarSaida.pontoMessage.edit({ content: `${_msgPontoParaColocarSaida.pontoMessage.content}\n${dataHora} Saída`, fetchReply: true });

//     //                 _msgPontoParaColocarSaida.pontoMessage.react('👋');

//     //                 await mensagem.delete();

//     //                 console.log(_msgPontoParaColocarSaida.pontoMessage.id)
//     //             }
//     //         }
//     //         else {
//     //             //await mensagem.channel.send('Nem chegou e já ta saindo fora?')
//     //             await mensagem.reply({ content: 'Nem chegou e já ta saindo fora?', ephemeral: true })
//     //             await mensagem.author.send('https://www.youtube.com/watch?v=6qkVt3AywOk');
//     //             break;
//     //         }

//     //         break;
//     // }
// });

client.on('messageReactionAdd', async (reaction, user) => {


    if (reaction.partial) {

        try {
            console.log('coisei o coiso!!');
            await reaction.fetch();
        } catch (error) {
            console.error('Error fetching reaction:', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    if (reaction.emoji.name === '🍽') {
        if (reaction.count === 2) {

            if (reaction.message.content.includes('Intervalo')) {
                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()

            } else if (reaction.message.interaction.user.id === user.id) {
                await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Intervalo`, fetchReply: true });
            } else {

                let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }

                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            }
        }

    } else if (reaction.emoji.name === '↩') {
        if (reaction.count === 2) {

            if (reaction.message.content.includes('Retorno')) {
                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            } else if (reaction.message.interaction.user.id === user.id) {
                await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Retorno`, fetchReply: true });
            } else {

                let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }

                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            }
        }
    } else if (reaction.emoji.name === '👋') {
        if (reaction.count === 2) {

            if (reaction.message.content.includes('Saída')) {
                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            } else if (reaction.message.interaction.user.id === user.id) {
                await reaction.message.edit({ content: `${reaction.message.content}\n${dia.pegaDataHora()} Saída`, fetchReply: true });

            } else {
                let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }

                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            }

        }
    } else if (reaction.emoji.name === '⛅') {

        if (reaction.count === 2) {

            if (reaction.message.interaction.user.id === user.id) {
                await reaction.message.channel.send({ content: `${fbomDia.mensagemDeBomDia()} <@${user.id}>`, fetchReply: true })
                    .then(msgBd => setTimeout(() => {
                        msgBd.delete()
                    }, 5000));
                let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(reaction.message.interaction.user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }

            } else {
                let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }

                await reaction.message.react('🤬')
                await reaction.message.reactions.cache.get('🤬').remove()
            }
        }
    }

});


var _interacoes = [];

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    var dataHora = dia.pegaDataHora();

    if (commandName === 'ponto') {

        var diaTodo = new Date().setHours(0, 0, 0, 0);

        var _interacao = { userID: interaction.user.id, horarioDia: interaction.createdTimestamp }
        console.log(_interacao);

        let _interacoesDoUser = _interacoes.filter(tm => tm.userID === interaction.user.id)
        console.log(_interacoesDoUser);
        _interacoesDoUser.reverse();

        let _ultimoPontoBatidoPeloUsuario = _interacoesDoUser.find(last => last.userID === interaction.user.id);


        if (_interacoesDoUser.length > 0) {

            _dataUltimoPonto = new Date(_ultimoPontoBatidoPeloUsuario.horarioDia).setHours(0, 0, 0, 0);

            console.log(_dataUltimoPonto);

            if (diaTodo > _dataUltimoPonto) {

                pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

                _interacao = { _interacao, pontoMessage };

                let _firstUserMsg = [{ interaction, pontoMessage }];
                // _interacoes.push(Object.assign(..._firstUserMsg));
                _interacoes.push(_interacao);
                messages.push(Object.assign(..._firstUserMsg));

                await pontoMessage.react('⛅');
                await pontoMessage.react('🍽');
                await pontoMessage.react('↩');
                await pontoMessage.react('👋');

                console.log(pontoMessage.id);

            } else {
                await interaction.reply({ content: 'Ô oreia, vai bate o ponto duas vezes? isso daí pra mim é Hack.', ephemeral: true, fetchReply: true })
            }
        } else {

            pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

            let _firstUserMsg = [{ interaction, pontoMessage }];

            console.log(_interacao);
            _interacoes.push(_interacao);
            messages.push(Object.assign(..._firstUserMsg));

            await pontoMessage.react('⛅');
            await pontoMessage.react('🍽');
            await pontoMessage.react('↩');
            await pontoMessage.react('👋');

            console.log(pontoMessage.id);
        }

    }

    // if (commandName === 'esquecidoponto') {

    // }

    // if (commandName == 'esquecipapa') {

    //     //verificar se tem algo na variavel de interactions
    //     //se tiver faz certin
    //     //se não avisa que precisa bater o ponto
    //     let _mensagensDePontoDoUsuario = messages.filter(fm => fm.interaction.user.id === interaction.user.id);
    //     _mensagensDePontoDoUsuario.reverse();

    //     let _UltimaMsgDePonto = _mensagensDePontoDoUsuario.find(last => last.interaction.user.id === interaction.user.id);

    //     if (_UltimaMsgDePonto) {

    //         dataUltimaMsg = new Date(_UltimaMsgDePonto.pontoMessage.createdTimestamp).setHours(0, 0, 0, 0);

    //         if (diaTodo > dataUltimaMsg) {
    //             await interaction.reply({ content: 'Pô esqueceu do ponto hoje Zé? ta marcando, usa o `/esqueciponto` ai vai', ephemeral: true })
    //         } else {
    //             var almocoDoCara = interaction.options.getString('horario');

    //             if (almocoDoCara.includes(':')) {
    //                 await interaction.reply({ content: 'êêêê.. oreiudo memo hein!', ephemeral: true });
    //                 pontoMessage.edit({ content: `${pontoMessage.content}\n${dia.pegaData()} - ${almocoDoCara} Intervalo`, fetchReply: true })
    //             } else {
    //                 await interaction.reply({ content: 'O modelo de horas utilizado é => **00:00**', ephemeral: true });
    //             }
    //         }
    //     } else {
    //         await interaction.reply({ content: 'Vai pro almoço direto?', ephemeral: true });
    //     }


    //     // var almocoDoCara = interaction.options.getString('horario');

    //     // if (almocoDoCara.includes(':')) {
    //     //     await interaction.reply({ content: 'êêêê.. oreiudo memo hein!', ephemeral: true});
    //     //     pontoMessage.edit({ content: `${pontoMessage.content}\n${todaysDay} - ${almocoDoCara} Intervalo`, fetchReply: true })
    //     // }else{
    //     //     await interaction.reply({ content: 'O modelo de horas utilizado é => **00:00**\n Te manca oreião', ephemeral: true});
    //     // }

    // }

});

client.login(process.env.BOT_TOKEN);