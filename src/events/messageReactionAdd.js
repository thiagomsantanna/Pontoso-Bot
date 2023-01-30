/* eslint no-return-await: "off" */
const sleep = require("node:timers/promises").setTimeout;
const { dateTime } = require("../../modules/dateTimeFormatter");
const { updateClockIn } = require("../../modules/clockIn");
const getRandomPhrase = require("../../modules/goodMorning");

module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Error fetching reaction:", error);
        return;
      }
    }

    const eventEmoji = reaction.emoji.name;

    const clockIn = reaction.message.content;
    const messageOwner = reaction.message.interaction.user;
    const userId = user.id;

    if (messageOwner.id !== userId || !isReactionCountCorrect(reaction))
      return await throwEmojiError(eventEmoji, reaction, userId);

    switch (eventEmoji) {
      case "⛅": {
        const morningMsg = await reaction.message.channel.send({
          content: `${getRandomPhrase()} <@${user.id}>`,
        });
        await sleep(2000);

        await morningMsg.delete();
        await removeEmoji("⛅", reaction, userId);
        break;
      }
      case "🍽": {
        if (clockIn.includes("Intervalo"))
          return await throwEmojiError("🍽", reaction, userId);

        await reaction.message.edit({ content: clockIn + stamp("🍽") });
        const { message } = reaction;

        await updateClockIn(userId, message.content);
        break;
      }
      case "↩": {
        if (!clockIn.includes("Intervalo") || clockIn.includes("Retorno"))
          return await throwEmojiError("↩", reaction, userId);

        await reaction.message.edit({ content: clockIn + stamp("↩") });
        const { message } = reaction;

        await updateClockIn(userId, message.content);
        break;
      }
      case "👋": {
        if (clockIn.includes("Saída"))
          return await throwEmojiError("👋", reaction, userId);

        await reaction.message.edit({ content: clockIn + stamp("👋") });
        const { message } = reaction;

        await updateClockIn(userId, message.content);
        break;
      }
      default:
        await throwEmojiError(eventEmoji, reaction, userId);
    }
  },
};

function stamp(emoji) {
  const events = {
    "🍽": "Intervalo",
    "↩": "Retorno",
    "👋": "Saída",
  };
  // eslint-disable-next-line prefer-template
  return `\n ${dateTime()} ` + events[emoji];
}

function isReactionCountCorrect(reaction) {
  return reaction.count === 2;
}

async function angryReact(reaction) {
  const reactions = reaction.message.reactions.cache;

  await reaction.message.react("🤬");
  await reactions.get("🤬").remove();
}

async function removeEmoji(emoji, reaction, userId) {
  const reactions = reaction.message.reactions.cache;
  const userReactions = reactions.filter((r) => r.users.cache.has(userId));

  for (const userReaction of userReactions.values()) {
    // eslint-disable-next-line no-underscore-dangle
    if (userReaction._emoji.name === emoji)
      await userReaction.users.remove(userId).catch((e) => console.error(e));
  }
}

async function throwEmojiError(emoji, reaction, userId) {
  await angryReact(reaction);
  await removeEmoji(emoji, reaction, userId);
}
