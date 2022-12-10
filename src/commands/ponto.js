const { ponto } = require("../commands");
const { date, dateTime } = require("../../modules/dateTimeFormatter");
const { clockIn, getClockIn } = require("../../modules/clockIn");
const { replyError, timeTableIsValid } = require("../../modules/commandCommons");

module.exports = {
  data: ponto,
  async execute(interaction) {
    const { user } = interaction;

    const timeTableOption = interaction.options.getString("horario");
    if (!timeTableOption && !timeTableIsValid(timeTableOption))
      return await replyError(interaction, "invalidDate");

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
