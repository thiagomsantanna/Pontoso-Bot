const { SlashCommandBuilder } = require("@discordjs/builders");
const dataUtil = require("../utils/DataHoraUtils.js");
const redis = require("../utils/RedisUtils.js");
const discord = require("../utils/PontoUtils.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ponto")
    .setDescription("Marca o horário de Início de trabalho.")
    .addStringOption((option) =>
      option
        .setName("horario")
        .setDescription("Coloca um horário especifíco")
        .setRequired(false)
    ),
  async execute(interaction) {
    let horarioOption = interaction.options.getString("horario");

    let pontoUsuario = JSON.parse(await redis.getPonto(interaction.user.id));
    const { DataHora, Data } = dataUtil;

    if (pontoUsuario) {
      let diaDoPonto = new Date(parseInt(pontoUsuario.data_ponto)).setHours(0, 0, 0, 0);

      let diaAtual = new Date().setHours(0, 0, 0, 0);

      if (diaAtual > diaDoPonto) {
        if (horarioOption) {
          if (
            horarioOption.match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
          ) {
            // dataHora = `${Data.Data} - ${horarioOption}`;

            const ponto = await discord.BateOPonto(interaction, `${Data} - ${horarioOption}`);
            await discord.AdicionaReacoes(ponto);

            console.log(ponto.id);
          } else {
            interaction.reply({
              content: `Qualfoi! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n<@${interaction.user.id}>`,
              ephemeral: true,
            });
          }
        } else {
          const ponto = await discord.BateOPonto(interaction, DataHora);
          await discord.AdicionaReacoes(ponto);

          console.log(ponto.id);
        }
      } else {
        interaction.reply({
          content: `>>> Mai é Zé dentro d\'água memo né, já bateu o ponto hoje mano.\n<@${interaction.user.id}>`,
          ephemeral: true,
        });
      }
    } else {
      if (horarioOption) {
        if (horarioOption.match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")) {
          const ponto = await discord.BateOPonto(
            interaction,
            `${Data} - ${horarioOption}`
          );
          await discord.AdicionaReacoes(ponto);

          console.log(ponto.id);
        } else {
          interaction.reply({
            content: `Qualfoi <@${interaction.user.id}>! \`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`,
            ephemeral: true,
          });
        }
      } else {
        const ponto = await discord.BateOPonto(interaction, DataHora);
        await discord.AdicionaReacoes(ponto);

        console.log(ponto.id);
      }
    }
  },
};
