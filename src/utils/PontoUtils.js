const redis = require('../utils/RedisUtils.js');

class Ponto {
    #emojis = ['⛅','🍽','↩','👋'];

    async AdicionaReacoes(ponto){
        this.#emojis.forEach(async emj => {
            await ponto.react(emj);
        })
    }
    async BateOPonto(comandoPonto, dataHorario){
        const ponto = await comandoPonto.reply(
            { 
                content: `>>> <@${comandoPonto.user.id}>\n${dataHorario} Início`,
                fetchReply: true 
            });
        
        await redis.salvaPonto(comandoPonto.user.id, comandoPonto.createdTimestamp, ponto.content);
    
        return ponto;
    }
}

module.exports = new Ponto();