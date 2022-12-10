const ERROR_MESSAGES = {
  invalidDate: (userId) => ({
    content: `Qualfoi <@${userId}>! Isso não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`,
    ephemeral: true,
  }),
  punchedTwoTimes: (userId) => ({
    content: `>>> Mai é Zé dentro d\'água memo né, já bateu o ponto hoje mano.\n<@${userId}>`,
    ephemeral: true,
  }),
  didNotPunched: (userId) => ({
    content: `<@${userId}>\n Você não tem nenhum ponto registrado ou seu último ponto já é de dias passados, utilize o \`ponto\` com seu horário de ínicio.`,
    ephemeral: true,
  }),
  breakWithoutReturn: (userId) => ({
    content: `<@${userId}>\n Você já registrou um intervalo, porém, não registrou um retorno para o mesmo, registre um retorno e utilize \`/esquecidoponto\` novamente caso deseje.`,
    ephemeral: true,
  }),
};

async function timeTableIsValid(option) {
  const regex = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
  return !!option.match(regex);
}

async function replyError(interaction, errorType) {
  const userId = interaction.user.id;

  await interaction.reply(ERROR_MESSAGES[errorType](userId));
}

module.exports = { replyError, timeTableIsValid };
