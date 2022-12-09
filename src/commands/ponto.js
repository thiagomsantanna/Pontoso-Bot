const { ponto } = require("../commands");
const { date, dateTime } = require("../../utils/dateTimeFormatter");
const { clockIn, getClockIn } = require("../../utils/clockIn");

const ERROR_MESSAGES = {
  invalidDate: (userId) => ({
    content: `Qualfoi <@${userId}>! Isso não é um horário válido, por favor usar o modelo \`HH:mm\`.\n`,
    ephemeral: true,
  }),
  punchedTwoTimes: (userId) => ({
    content: `>>> Mai é Zé dentro d\'água memo né, já bateu o ponto hoje mano.\n<@${userId}>`,
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

module.exports = {
  data: ponto,
  async execute(interaction) {
    const { user } = interaction;

    const timeTableOption = interaction.options.getString("horario");
    if (!timeTableOption && !timeTableIsValid)
      replyError(interaction, "invalidDate");

    const userClockKey = await getClockIn(user.id);
    
    const timestampKey = parseInt(userClockKey.date);
    const clockInDay = new Date(timestampKey).setHours(0, 0, 0, 0);
    const todaysDay = new Date().setHours(0, 0, 0, 0);

    const clockInSchedule = timeTableOption
      ? `${date()} - ${timeTableOption}`
      : dateTime();

    // verify if the user already punched the clock
    if (userClockKey) {
      // checks if the timetable from the punched clock is older than today
      if (todaysDay > clockInDay) {
        const { id } = await clockIn(interaction, clockInSchedule);
        console.log(id);

        return;
      }

      await replyError(interaction, "punchedTwoTimes");
    }

    const { id } = await clockIn(interaction, clockInSchedule);
    console.log(id);
  },
};
