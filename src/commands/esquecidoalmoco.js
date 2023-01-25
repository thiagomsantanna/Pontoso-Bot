/* eslint-disable no-return-await */
const { esquecidoalmoco } = require(".");
const { date } = require("../../modules/dateTimeFormatter");
const { getClockIn } = require("../../modules/clockIn");
const {
  replyError,
  schedulesIsValid,
} = require("../../modules/commandCommons");

module.exports = {
  data: esquecidoalmoco,
  async execute(interaction) {
    const userId = interaction.user.id;

    const timeOption = interaction.options.getString("horario");
    if (timeOption && !schedulesIsValid(timeOption))
      return await replyError(interaction, "invalidDate");

    const isValid = await clockInIsValid(userId);
    if (!isValid) return await replyError(interaction, "didNotPunched");

    const clockIn = await getLastUserClockIn(interaction, userId);

    const lunch = clockIn.content
      .split("\n")
      .find((c) => c.includes("Intervalo"));
    const correctLunch = `\n ${date()} - ${timeOption} Intervalo`;

    if (lunch) {
      clockIn.content = clockIn.content.replace(`\n${lunch}`, correctLunch);
    } else {
      clockIn.content += correctLunch;
    }

    await clockIn.edit(clockIn.content);
    await interaction.reply({
      content: `<@${userId}>\n Inserimos seu horário de intervalo!`,
      ephemeral: true,
    });
  },
};

async function clockInIsValid(userId) {
  const userClockIn = await getClockIn(userId);
  if (!userClockIn) return false;

  const { timestamp } = userClockIn;

  const today = new Date().setHours(0, 0, 0, 0);
  const lastClockInDate = new Date(timestamp).setHours(0, 0, 0, 0);

  return lastClockInDate === today;
}

async function getLastUserClockIn(interaction, userId) {
  const guild = await interaction.guild.fetch();
  const guildChannels = await guild.channels.fetch();
  const pontoChannel = guildChannels.find((c) => c.name === "ponto");

  const pontoMessages = await pontoChannel.messages.fetch();
  const clockIns = pontoMessages.filter(
    ({ author }) => author.username === "Pontoso",
  );

  return clockIns.find((msg) => msg.content.includes(`<@${userId}>`));
}
