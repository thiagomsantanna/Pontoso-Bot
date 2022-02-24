const { SlashCommandBuilder } = require("@discordjs/builders");
const dia = require('../utils/pegaDataHora.js');
const redis = require('../db/redisConnection');
const discord = require('../utils/pontoCommands');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ponto")
    .setDescription("Marca o horário de Início de trabalho.")
    .addStringOption((option) =>
      option
        .setName("horario")
        .setDescription("Coloca um horário especifíco")
        .setRequired(false)),
  async execute(interaction) {
    let horarioOption = interaction.options.getString('horario');

    // var pontoUsuario = await redis.getPontosDoUsuario(interaction.user.id);
    let pontoUsuario = JSON.parse(await redis.getPontosDoUsuario(interaction.user.id));
    let dataHora;

    if (pontoUsuario) {

        let diaDoPonto = new Date(parseInt(pontoUsuario.data_ponto)).setHours(0, 0, 0, 0);

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

                let pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });

                //console.log(pontoMessage);
                await pontoMessage.react('⛅');
                await pontoMessage.react('🍽');
                await pontoMessage.react('↩');
                await pontoMessage.react('👋');

                
                await redis.salvaPonto(interaction.user.id, interaction.createdTimestamp, pontoMessage.content);

                console.log(pontoMessage.id);
            } else {
                interaction.reply({ content: `Qualfoi <@${interaction.user.id}>! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`, ephemeral: true });
            }

        } else {

            dataHora = `${dia.pegaDataHora()}`;
            // let pontoMessage = await interaction.reply({ content: `>>> <@${interaction.user.id}>\n${dataHora} Início`, fetchReply: true });
            // await redis.salvaMessage(pontoMessage, interaction);

            const ponto = await discord.respondeOPonto(interaction, dataHora);
            discord.adicionaReacoes(ponto, ['⛅', '🍽', '↩', '👋']);

            console.log(ponto.id);
        }

    }

  },
};
