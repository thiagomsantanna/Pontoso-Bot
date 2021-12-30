const redis = require('./redisConnection');

async function adicionaReacoes(ponto, reacoes){

    await ponto.react(reacoes[0]);
    await ponto.react(reacoes[1]);
    await ponto.react(reacoes[2]);
    await ponto.react(reacoes[3]);
}

async function respondeOPonto(interacao, dataeHorario){

    const pontoInicio = await interacao.reply(
        { 
            content: `>>> <@${interacao.user.id}>\n${dataeHorario} Início`, 
            fetchReply: true 
        });

    await redis.salvaPonto(interacao.user.id, interacao.createdTimestamp);

    return pontoInicio;
}

module.exports = { adicionaReacoes, respondeOPonto };