const redis = require("../db/redis");

async function setClockIn(user, timestamp, clockInObj) {
  const { id: userId, username } = user;
  const keyContent = JSON.stringify({ username, timestamp, clockIn: clockInObj });

  await redis
    .set(`ponto:${userId}`, keyContent, { EX: 72000 })
    .catch(console.error);
}

async function getClockIn(userId) {
  const clockInObj = await redis.get(`ponto:${userId}`);
  return JSON.parse(clockInObj);
}

async function updateClockIn(userId, updatedClockIn) {
  const actualKey = await getClockIn(userId);
  const keyTTL = await redis.ttl(`ponto:${userId}`);

  const updatedClockInKey = JSON.stringify({
    ...actualKey,
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

  await setClockIn(user, createdTimestamp, clockInObj.content);

  return clockInObj;
}

module.exports = {
  setClockIn,
  getClockIn,
  updateClockIn,
  clockIn,
};
