const dia = require('../utils/pegaDataHora.js');
const fbomDia = require('../utils/frasesBomDia.js');

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user) {
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
    
                if (!reaction.message.content.includes('Intervalo')) {
                    await reaction.message.react('🤬')
                    await reaction.message.reactions.cache.get('🤬').remove()
                    
                    let userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
    
                    try {
                        for (const reaction of userReactions.values()) {
                            reaction._emoji.name == '↩' ? await reaction.users.remove(user.id) : null;
                            // await reaction.users.remove(user.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }
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
    
            //adicionar verificação de horario de saida --> if (reaction.message.content.includes('Saída')) {
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
    }
};