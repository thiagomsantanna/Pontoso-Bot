const redis = require("redis");
const { promisify } = require('util')
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

//client.get('user:1', (err, result) => {discordo = result; console.log(discordo)});

//client.set('user:1', 'João', (error, result) => {console.log(result)});
//console.log(await client.get('foo'));



async function salvaMessage(pontoMessage, interaction) {
    let dale = { interaction: interaction, pontoMessage: pontoMessage };
    const json = JSON.stringify(dale, (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
    );

    console.log(json);

    client.set('test', json, (error, result) => {
        console.log(result, error);
    });
};

var value;
async function getChave() {

    const getAsync = promisify(client.get).bind(client);
    let valorChave = await getAsync('test')
    
    return valorChave;
    //return client.get('user:1');//, (err, result) => {console.log(result)}
}

//salvaMessage('daledaledaleputaqpariu');
module.exports = { salvaMessage, getChave };