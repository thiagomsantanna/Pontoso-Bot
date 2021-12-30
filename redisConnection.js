const redis = require("redis");
const { promisify } = require('util')
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const client = redis.createClient(); //por padrão o redis usa a porta 6379 e ip 127.0.0.1
//const client = redis.createClient(port, host); //porta e ip

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

async function salvaPonto(usuario_id, data_ponto) {

    const setAsync = promisify(client.set).bind(client);
    
    await setAsync(`ponto_batido:${usuario_id}`, data_ponto, 'EX', 57600)//12h
        .then((error, result) => { 
            error ? console.log(error) : console.log(result); 
        });
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

//salvaMessage('daledaledaleputaqpariu');
salvaPonto('test', 'fodase');
module.exports = { salvaPonto, salvaMessage, getChave, getPontosDoUsuario, apagaPontoAntigo };