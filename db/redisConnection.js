const redis = require("redis");
const { promisify } = require('util')
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
require('dotenv').config({ path: '.env' })

let client;

if(process.env.REDIS_URL){
    //connect no redis no heroku
    client = redis.createClient({
        url: process.env.REDIS_URL,
    })
} else {
    //connect no redis localhost
    client = redis.createClient();
}

//escuta qualquer erro causado na conexão com o redis
client.on("error", (err) => {
    console.log("Error - " + err);
});

//escuta qualquer conexão com o redis
client.on('connect', () => {
    console.log('Conectado!');
});


async function salvaMessage(pontoMessage, interaction) {
    let dale = { interaction, pontoMessage };
    const json = JSON.stringify(dale, (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
    );

    //console.log(json);

    client.set('test', json, (error, result) => {
        console.log(result, error);
    });
};

async function salvaPonto(usuario_id, data_ponto, horarios) {

    const pontoObj = { data_ponto: data_ponto, horarios: horarios };

    const setAsync = promisify(client.set).bind(client);
    
    await setAsync(`ponto_batido:${usuario_id}`, JSON.stringify(pontoObj), 'EX', 72000);
}

async function getPontosDoUsuario(usuario_id) {

    const getAsync = promisify(client.get).bind(client);
    let ponto = await getAsync(`ponto_batido:${usuario_id}`)

    return ponto;
}

async function getChave() {

    const getAsync = promisify(client.get).bind(client);
    let valorChave = await getAsync('test')

    return valorChave;
}

async function apagaPontoAntigo(usuario) {

    client.del(`ponto_batido:${usuario}`, function (err, response) {
        if (response == 1) {
            console.log("Deleted Successfully!")
        } else {
            console.log("Cannot delete")
        }
    });
}

module.exports = { salvaPonto, salvaMessage, getChave, getPontosDoUsuario, apagaPontoAntigo };