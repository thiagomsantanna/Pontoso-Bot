require('dotenv').config({ path: '.env' })
const fs = require('fs');
const path = require('path');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);


const commandFiles = fs.readdirSync(path.resolve(__dirname, '../commands/')).filter(file => file.endsWith('.js'));
let commands = [];

for(const file of commandFiles){
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
};


module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(guild){
        let pontoChannel;
        
        let channels = await guild.channels.fetch();

        if(!channels.some( chnll => chnll.name === 'ponto' )){

            pontoChannel = await guild.channels.create('ponto', { type: 'text' });

            const test = {
                title: "Obrigado por convidar o Pontoso ao seu servidor!",
                color: 9515056,
                description: "\n\nRecomendamos o uso do bot em um canal separado assim como esse para evitar de poluir outros canais e facilitar o uso, porém, os comandos funcionarão em todos os canais sem problemas, sinta-se à vontade de usar a sua maneira!\n\n\nOs comandos para uso são:\n\n   `/ponto` - Para iniciar o ponto e utilize os emojis abaixo do Ponto para marcar os momentos de intervalo e saída do expediente. Também é possível passar um horário específico de ínicio do ponto utilizando a opção de `horário` junto do `/ponto`.\n\n`/esquecidoalmoco` - Para caso esqueça de marcar o horário de Intervalo na hora exata e necessite passar um horário específico. Utilize a opção de `horário` para passar a hora.",
                thumbnail: {
                       url: "https://i.pinimg.com/originals/d5/e8/88/d5e8885841aaf131b836fa4f955ac2fa.gif"
                },
            };
    
            await pontoChannel.send({ content: "@everyone", embeds: [test] });
        }
        
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), { body: commands })
	        .then(() => console.log(`Commandos deployados para: ${guild.name}`))
	        .catch(console.error);
    }
};