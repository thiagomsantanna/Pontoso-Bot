const client = require("../db/redisConnection");

const emojis = ["⛅", "🍽", "↩", "👋"];

async function setClockIn(userId, date, timetable) {
  const keyContent = JSON.stringify({ date, timetable });
  return await client.get(`ponto:${userId}`, keyContent, "EX", 72000);
}

async function getClockIn(userId) {
  const clockInObj = await client.get(`ponto:${userId}`);
  return JSON.parse(clockInObj);
}

async function addReactions(clockInMsgObj) {
  for (const emoji of emojis) {
    await clockInMsgObj.react(emoji);
  }
}

async function clockIn(commandMsgObj, dateTime) {
  const { user, createdTimestamp } = commandMsgObj;
  const clockIn = await commandMsgObj.deferReply({
    content: `>>> <@${user.id}>\n${dateTime} Início`,
    fetchReply: true,
  });
  await addReactions(clockIn);

  await setClockIn(user.id, createdTimestamp, clockIn.content).catch((err) => {
    throw err;
  });

  return clockIn;
}

module.exports = { clockIn, getClockIn };
