const { dateTime } = require("../../modules/dateTimeFormatter");
const getRandomPhrase = require("../../modules/goodMorning");

const isReactionCountCorrect = (reaction) => reaction.count === 2;

async function angryReact(reaction) {
  const reactions = reaction.message.reactions.cache;

  await reaction.message.react("🤬");
  await reactions.get("🤬").remove();
}

async function removeEmoji(emoji, reaction, userId) {
  const reactions = reaction.message.reactions.cache;
  const userReactions = reactions.filter((r) => r.users.cache.has(userId));

  for (const reaction of userReactions) {
    if (reaction._emoji.name === emoji)
      await reaction.users.remove(userId).catch((e) => console.error(e));
  }
}

async function throwEmojiError(emoji, reaction, userId) {
  await angryReact(reaction);
  await removeEmoji(emoji, reaction, userId);
}

module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(reaction, user) {
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

    if (messageOwner.id !== userId || !isReactionCountCorrect(reaction)) {
      await throwEmojiError(eventEmoji, reaction, userId);
      return;
    }

    switch (eventEmoji) {
      case "⛅":
        const morningMsg = await reaction.message.channel.send({
          content: `${getRandomPhrase()} <@${user.id}>`,
          fetchReply: true,
        });
        setTimeout(() => morningMsg.delete(), 5000);

        await removeEmoji("⛅", reaction, userId);

        break;
      case "🍽":
        if (clockIn.includes("Intervalo"))
          return await throwEmojiError("🍽", reaction, userId);

        await reaction.message.edit({
          content: `${clockIn}\n${dateTime()} Intervalo`,
          fetchReply: true,
        });

        break;
      case "↩":
        if (!clockIn.includes("Intervalo"))
          return await throwEmojiError("↩", reaction, userId);

        await reaction.message.edit({
          content: `${clockIn}\n${dateTime} Retorno`,
          fetchReply: true,
        });

        break;
      case "👋":
        if (clockIn.includes("Saída"))
          return await throwEmojiError("👋", reaction, userId);

        await reaction.message.edit({
          content: `${clockIn}\n${dateTime()} Saída`,
          fetchReply: true,
        });

        break;
      default:
        await throwEmojiError(eventEmoji, reaction, userId);
        break;
    }
  },
};
