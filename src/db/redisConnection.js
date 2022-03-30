const redis = require("redis");
require('dotenv').config({ path: '.env' });

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

client.on("error", (err) => {
    console.log("Error - " + err);
});

client.on('connect', () => {
    console.log('Conectado!');
});

module.exports = client;
// module.exports = { salvaPonto, salvaMessage, getChave, getPontosDoUsuario, apagaPontoAntigo };