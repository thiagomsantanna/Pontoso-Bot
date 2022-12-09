const { SlashCommandBuilder } = require("@discordjs/builders");

const ponto = new SlashCommandBuilder()
  .setName("ponto")
  .setDescription("Marca o horário de Início de trabalho.")
  .addStringOption((option) =>
    option
      .setName("horario")
      .setDescription("Coloca um horário especifíco")
      .setRequired(false)
  );

const esquecidoalmoco = new SlashCommandBuilder()
  .setName("esquecidoalmoco")
  .setDescription("Pros esquecidos que esqueceram de bater o Almoço")
  .addStringOption((option) =>
    option
      .setName("horario")
      .setDescription(
        'Horário no qual saiu para seu intervalo,\n utilize o modelo => "00:00" com dois pontos'
      )
      .setRequired(true)
  );

// const esqueci = new SlashCommandBuilder()
//   .setName("esqueci")
//   .setDescription("Pros esquecidos que esqueceram de bater o ponto")
//   .addStringOption((option) =>
//     option
//       .setName("horario")
//       .setDescription(
//         'Horário no qual deveria ter batido o ponto,\n utilize o modelo => "00:00" com dois pontos'
//       )
//       .setRequired(true)
//   );

module.exports = { ponto, esquecidoalmoco };
