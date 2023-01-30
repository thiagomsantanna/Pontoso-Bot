const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const { ChannelType } = require("discord.js");
const commands = require("../commands");

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

const welcomeMessage = {
  title: `Obrigado por convidar o ${process.env.BOT_NAME ?? "Pontoso"} ao seu servidor!`,
  color: 9515056,
  description:
    "\n\nRecomendamos o uso do bot em um canal separado assim como esse para evitar de poluir outros canais e facilitar o uso, porém, os comandos funcionarão em todos os canais sem problemas, sinta-se à vontade de usar a sua maneira!\n\n\nOs comandos para uso são:\n\n   `/ponto` - Para iniciar o ponto e utilize os emojis abaixo do Ponto para marcar os momentos de intervalo e saída do expediente. Também é possível passar um horário específico de ínicio do ponto utilizando a opção de `horário` junto do `/ponto`.\n\n`/esquecidoalmoco` - Para caso esqueça de marcar o horário de Intervalo na hora exata e necessite passar um horário específico. Utilize a opção de `horário` para passar a hora.",
  thumbnail: {
    url: "https://i.pinimg.com/originals/d5/e8/88/d5e8885841aaf131b836fa4f955ac2fa.gif",
  },
};

module.exports = {
  name: "guildCreate",
  once: false,
  async execute(guild) {
    const channels = await guild.channels.fetch();
    const alreadyHasChannel = channels.some((c) => c.name === "ponto");

    if (!alreadyHasChannel) {
      const pontoChannel = await guild.channels.create({
        name: "ponto",
        type: ChannelType.GuildText,
      });

      await pontoChannel.send({
        content: "@everyone",
        embeds: [welcomeMessage],
      });
    }

    const route = Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      guild.id,
    );
    const payload = { body: Object.values(commands).map((c) => c.toJSON()) };

    await rest.put(route, payload).catch(console.error);

    console.log(`✅ Successfully deployed commands to: ${guild.name}`);
  },
};
