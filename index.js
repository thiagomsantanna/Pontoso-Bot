const result = require('dotenv').config({ path: '.env' })
const dia = require('./pegaDataHora.js');
const fbomDia = require('./frasesBomDia.js');
const redis = require('./redisConnection');
const discord = require('./pontoCommands');
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


client.once('ready', () => {
    console.log('Ready!');
});


client.on('messageCreate', async (mensagem, user) => {

    const mensagemFodase = mensagem.content;

    if (mensagemFodase == 'mentos' && mensagemFodase.includes('mentos')) {
        const jhonson = await mensagem.reply({ content: '🥰O PÉ FAZ ASSIM🦶🦵MAOZINHA🖐🖐 PRO ALTO🙋‍♀️🙋‍♀️ 😂😂 BALANÇA O PESCOÇO🙆‍♀️🙇‍♀️🙇‍♀️💃💃 PRA LÁ E PRA CÁ 😍😍🤣🤣👍👍👍 Ziguiriguidum Zi-gui-ri-gui-dum Zi gui ri gui dum🤣🤣🤣🤣🤣🤣👍👍', ephemeral: true, fetchReply: true });

        setTimeout(() => {
            jhonson.delete();
        }, 5000);
    }
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
            await reaction.fetch();
            console.log('coisei o coiso!!');

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


client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    var dataHora = dia.pegaDataHora();

    if (commandName === 'ponto') {


        let horarioOption = interaction.options.getString('horario');

        var pontoUsuario = await redis.getPontosDoUsuario(interaction.user.id);

        if (pontoUsuario) {

            let diaDoPonto = new Date(parseInt(pontoUsuario)).setHours(0, 0, 0, 0);
            console.log(`dia do ponto -> ${new Date(diaDoPonto)}`);
            let diaAtual = new Date().setHours(0, 0, 0, 0);

            if (diaAtual > diaDoPonto) {

                if (horarioOption) {

                    if (horarioOption.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
                        dataHora = `${dia.pegaData()} - ${horarioOption}`;

                        pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

                        await pontoMessage.react('⛅');
                        await pontoMessage.react('🍽');
                        await pontoMessage.react('↩');
                        await pontoMessage.react('👋');

                        await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp);

                        console.log(pontoMessage.id);
                    } else {
                        interaction.reply({ content: `Qualfoi! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n<@${interaction.user.id}>`, ephemeral: true });
                    }

                } else {

                    pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

                    await pontoMessage.react('⛅');
                    await pontoMessage.react('🍽');
                    await pontoMessage.react('↩');
                    await pontoMessage.react('👋');

                    await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp);

                    console.log(pontoMessage.id);
                }

            } else {
                interaction.reply({ content: `>>> Mai é Zé dentro d\'água memo né, já bateu o ponto hoje mano.\n<@${interaction.user.id}>`, ephemeral: true });
            }

        } else {

            if (horarioOption) {

                if (horarioOption.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
                    dataHora = `${dia.pegaData()} - ${horarioOption}`;

                    pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

                    await pontoMessage.react('⛅');
                    await pontoMessage.react('🍽');
                    await pontoMessage.react('↩');
                    await pontoMessage.react('👋');

                    await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp);

                    console.log(pontoMessage.id);
                } else {
                    interaction.reply({ content: `Qualfoi <@${interaction.user.id}>! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`, ephemeral: true });
                }

            } else {

                const ponto = await discord.respondeOPonto(interaction, dataHora);
                discord.adicionaReacoes(ponto, ['⛅', '🍽', '↩', '👋']);

                console.log(ponto.id);
            }

        }

    }

});

client.login(process.env.BOT_TOKEN);