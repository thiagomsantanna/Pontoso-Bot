const { esquecidoalmoco } = require("../commands");
const { date } = require("../../modules/dateTimeFormatter");
const { getClockIn } = require("../../modules/clockIn");
const { replyError, timeTableIsValid } = require("../../modules/commandCommons");

async function validateClockIn(lastUserClockIn) {
  const { createdTimestamp, content } = lastUserClockIn;

  const today = new Date().setHours(0, 0, 0, 0);
  const lastUserClockInDate = new Date(createdTimestamp).setHours(0, 0, 0, 0);

  if (!lastUserClockIn || lastUserClockInDate !== today)
    return await replyError(interaction, "didNotPunched");

  if (content.includes("Intervalo") && !content.includes("Retorno")) {
    return await replyError(interaction, "breakWithoutReturn");
  }
}

async function getLastUserClockIn({ guild }) {
  const guild = await guild.fetch();

  const guildChannels = await guild.channels.fetch();
  const pontoChannel = guildChannels.find(
    ({ name }) => name === "ponto" && c.type === "GUILD_TEXT"
  );
  const clockIns = (await pontoChannel.messages.fetch()).filter(
    ({ author }) => author.username === "Pontoso"
  );

  return clockIns.find((msg) => msg.content.includes(`<@${userId}>`));
}

module.exports = {
  data: esquecidoalmoco,
  async execute(interaction) {
    const userId = interaction.user.id;
    const timeTableOption = interaction.options.getString("horario");
    if (!timeTableOption && !timeTableIsValid(timeTableOption))
      return await replyError(interaction, "invalidDate");

    const userClockKey = await getClockIn(userId);
    if (!userClockKey) return await replyError(interaction, "didNotPunched");

    const lastUserClockIn = await getLastUserClockIn(interaction);

    // TODO: Ensure that the method stops the execution if an error is replied
    await validateClockIn(lastUserClockIn);

    await lastUserClockIn.edit(
      `${lastUserClockIn.content}\n${date()} - ${timeTableOption} Intervalo`
    );
    await interaction.reply({
      content: `<@${userId}>\n Inserimos seu horário de intervalo!`,
      ephemeral: true,
    });
  },
};
