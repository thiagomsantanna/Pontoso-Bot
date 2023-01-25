/* eslint-disable no-return-await */
const { ponto } = require(".");
const { date, dateTime } = require("../../modules/dateTimeFormatter");
const { clockIn, getClockIn } = require("../../modules/clockIn");
const {
  replyError,
  schedulesIsValid,
} = require("../../modules/commandCommons");

module.exports = {
  data: ponto,
  async execute(interaction) {
    const { user } = interaction;

    const timeOption = interaction.options.getString("horario");
    if (timeOption && !schedulesIsValid(timeOption))
      return await replyError(interaction, "invalidDate");

    const userClockIn = await getClockIn(user.id);
    const todaysDay = new Date().setHours(0, 0, 0, 0);

    const clockInSchedule = timeOption
      ? `${date()} - ${timeOption}`
      : dateTime();

    // verify if the user already punched the clock
    if (userClockIn) {
      const timestampKey = parseInt(userClockIn.timestamp, 10);
      const clockInDay = new Date(timestampKey).setHours(0, 0, 0, 0);

      // also checks if schedules from the punched clock is older than today
      if (todaysDay > clockInDay) {
        const { id } = await clockIn(interaction, clockInSchedule);
        console.log(id);

        return;
      }

      return await replyError(interaction, "punchedTwoTimes");
    }

    const { id } = await clockIn(interaction, clockInSchedule);
    console.log(id);
  },
};
