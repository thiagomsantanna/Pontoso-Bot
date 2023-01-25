const redis = require("../db/redis");

async function setClockIn(userId, timestamp, clockInObj) {
  const keyContent = JSON.stringify({ timestamp, clockIn: clockInObj });

  await redis
    .set(`ponto:${userId}`, keyContent, { EX: 72000 })
    .catch(console.error);
}

async function getClockIn(userId) {
  const clockInObj = await redis.get(`ponto:${userId}`);
  return JSON.parse(clockInObj);
}

async function updateClockIn(userId, updatedClockIn) {
  const { timestamp } = await getClockIn(userId);
  const keyTTL = await redis.ttl(`ponto:${userId}`);

  const updatedClockInKey = JSON.stringify({
    timestamp,
    clockIn: updatedClockIn,
  });

  await redis
    .set(`ponto:${userId}`, updatedClockInKey, { EX: keyTTL })
    .catch(console.error);
}

async function addReactions(clockInMsgObj) {
  for (const emoji of ["⛅", "🍽", "↩", "👋"]) {
    await clockInMsgObj.react(emoji);
  }
}

async function clockIn(commandMsgObj, dateTime) {
  const { user, createdTimestamp } = commandMsgObj;

  const clockInObj = await commandMsgObj.reply({
    content: `>>> <@${user.id}>\n ${dateTime} Início`,
    fetchReply: true,
  });
  await addReactions(clockInObj);

  await setClockIn(user.id, createdTimestamp, clockInObj.content);

  return clockInObj;
}

module.exports = {
  setClockIn,
  getClockIn,
  updateClockIn,
  clockIn,
};
