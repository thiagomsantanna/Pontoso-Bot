const { SlashCommandBuilder, SlashCommandAssertions } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

const commands = [
    //new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.'),
    new SlashCommandBuilder().setName('ponto').setDescription('Marca o horário de Início de trabalho.').addStringOption(option => 	option.setName('horario').setDescription('Coloca um horário especifíco caso desejado').setRequired(false)),
    new SlashCommandBuilder().setName('esquecidoalmoco').setDescription('Pros esquecidos que esqueceram de bater o Almoço').addStringOption(option => 
        option.setName('horario')
        .setDescription('Horário no qual saiu para almoço,\n utilize o modelo => "00:00" com dois pontos')
        .setRequired(true)),
    new SlashCommandBuilder().setName('esqueci').setDescription('Pros esquecidos que esqueceram de bater o ponto').addStringOption(option => 
        option.setName('horario')
        .setDescription('Horário no qual deveria ter batido o ponto,\n utilize o modelo => "00:00" com dois pontos')
        .setRequired(true))
]
    .map(command => command.toJSON());

module.exports ={
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
                description: "\n\nRecomendamos o uso do bot em um canal separado assim como esse para evitar de poluir outros canais e facilitar o uso, porém, os comandos funcionarão em todos os canais sem problemas, sinta-se à vontade de usar a sua maneira!\n\n\nOs comandos para uso são:\n\n   `/ponto` - Para iniciar o ponto e utilize os emojis abaixo do Ponto para marcar os momentos de intervalo e saída do expediente. Também é possível passar um horário específico de ínicio do ponto utilizando a opção de `horário` junto do `/ponto`.\n\n",
                thumbnail: {
                       url: "https://i.pinimg.com/originals/d5/e8/88/d5e8885841aaf131b836fa4f955ac2fa.gif"
                },
            };
    
            await pontoChannel.send({ content: "@everyone", embeds: [test] });
        }
        
        rest.put(Routes.applicationGuildCommand(process.env.CLIENT_ID, guild.id), {body: commands })
            .then(() => console.log(`Comandos adicionados ao servidor ${guild.name}`))
            .catch(console.error);
    }
};