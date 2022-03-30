const { SlashCommandBuilder } = require("@discordjs/builders");
const { DataHora, Data } = require("../utils/DataHoraUtils.js");
// const redis = require("../db/redisConnection");
const redis = require('../utils/RedisUtils.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("esquecidoalmoco")
    .setDescription("Pros esquecidos que esqueceram de bater o Almoço")
    .addStringOption((option) =>
      option
        .setName("horario")
        .setDescription(
          'Horário no qual saiu para seu intervalo,\n utilize o modelo => "00:00" com dois pontos'
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let horarioOption = interaction.options.getString("horario");

    // var pontoDoUsuario = JSON.parse(
    //   await redis.getPonto(interaction.user.id)
    // );
    let pontoUsuario = JSON.parse(await redis.getPonto(interaction.user.id));

    if (!pontoUsuario) {
      await interaction.reply({
        content: `<@${interaction.user.id}>\n Você não tem nenhum ponto registrado ou seu último ponto já é de dias passados, utilize o \`ponto\` com seu horário de ínicio.`,
        ephemeral: true,
      });
      return;
    }

    if (!horarioOption.match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")) {
      await interaction.reply({
        content: `Qualfoi <@${interaction.user.id}>!\n\`${horarioOption}\` não é um horário válido, por favor usar o modelo \`HH:mm\`.`,
        ephemeral: true,
      });
      return;
    }

    let server = await interaction.guild.fetch();
    let canaisServer = await server.channels.fetch();

    let canalPonto = canaisServer.find(
      (c) => c.name === "ponto" && c.type === "GUILD_TEXT"
    );

    let pontos = await canalPonto.messages.fetch();
    pontos = pontos.filter((msg) => msg.author.username === "Pontoso");
    const ultimoPontoDoUsuario = pontos.find((msg) =>
      msg.content.includes(`<@${interaction.user.id}>`)
    );

    const dataUltimoPontoDoUsuario = new Date(
      ultimoPontoDoUsuario.createdTimestamp
    ).setHours(0, 0, 0, 0);
    const dataAtual = new Date().setHours(0, 0, 0, 0);

    if (ultimoPontoDoUsuario && dataUltimoPontoDoUsuario == dataAtual) {
      if (
        ultimoPontoDoUsuario.content.includes("Intervalo") &&
        !ultimoPontoDoUsuario.content.includes("Retorno")
      ) {
        await interaction.reply({
          content: `<@${interaction.user.id}>\n Você já registrou um intervalo, porém, não registrou um retorno para o mesmo, registre um retorno e utilize \`/esquecidoponto\` novamente caso deseje.`,
          ephemeral: true,
        });
        return;
      }

      await ultimoPontoDoUsuario.edit(
        `${ultimoPontoDoUsuario.content}\n${Data} - ${horarioOption} Intervalo`
      );

      await interaction.reply({
        content: `<@${interaction.user.id}>\n Inserimos seu horário de intervalo devidamente!`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `<@${interaction.user.id}>\n Você não tem nenhum ponto registrado ou seu último ponto já é de dias passados, utilize o \`ponto\` com seu horário de ínicio.`,
        ephemeral: true,
      });
    }
  },
};
