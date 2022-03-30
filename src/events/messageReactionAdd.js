const dataUtil = require("../utils/DataHoraUtils.js");
const frasesBomDiaUtil = require('../utils/FrasesBomDia.js');

module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(reaction, user) {

    const { DataHora, Data } = dataUtil;
    const { MensagemDeBomDia } = frasesBomDiaUtil;

    if (reaction.partial) {
      try {
        await reaction.fetch();
        console.log("coisei o coiso!!");
      } catch (error) {
        console.error("Error fetching reaction:", error);
        return;
      }
    }

    if (reaction.emoji.name === "🍽") {
      if (reaction.count === 2) {
        if (reaction.message.content.includes("Intervalo")) {
          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        } else if (reaction.message.interaction.user.id === user.id) {
          await reaction.message.edit({
            content: `${
              reaction.message.content
            }\n${DataHora} Intervalo`,
            fetchReply: true,
          });
        } else {
          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) => reaction.users.cache.has(user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }

          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        }
      }
    } else if (reaction.emoji.name === "↩") {
      if (reaction.count === 2) {
        if (!reaction.message.content.includes("Intervalo")) {
          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();

          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) => reaction.users.cache.has(user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              reaction._emoji.name == "↩"
                ? await reaction.users.remove(user.id)
                : null;
              // await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        } else if (reaction.message.interaction.user.id === user.id) {
          await reaction.message.edit({
            content: `${
              reaction.message.content
            }\n${DataHora} Retorno`,
            fetchReply: true,
          });
        } else {
          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) => reaction.users.cache.has(user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }

          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        }
      }
    } else if (reaction.emoji.name === "👋") {
      if (reaction.count === 2) {
        if (reaction.message.content.includes("Saída")) {
          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        } else if (reaction.message.interaction.user.id === user.id) {
          await reaction.message.edit({
            content: `${reaction.message.content}\n${DataHora} Saída`,
            fetchReply: true,
          });
        } else {
          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) => reaction.users.cache.has(user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }

          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        }
      }
    } else if (reaction.emoji.name === "⛅") {
      if (reaction.count === 2) {
        if (reaction.message.interaction.user.id === user.id) {
          await reaction.message.channel
            .send({
              content: `${MensagemDeBomDia} <@${user.id}>`,
              fetchReply: true,
            })
            .then((msgBd) =>
              setTimeout(() => {
                msgBd.delete();
              }, 5000)
            );
          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) =>
              reaction.users.cache.has(reaction.message.interaction.user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        } else {
          let userReactions = reaction.message.reactions.cache.filter(
            (reaction) => reaction.users.cache.has(user.id)
          );

          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(user.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }

          await reaction.message.react("🤬");
          await reaction.message.reactions.cache.get("🤬").remove();
        }
      }
    }
  },
};
