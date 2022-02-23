//const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const result = require('dotenv').config({ path: '.env' })

const cityID = '3448639';
var emojiDoDia; 

async function pegaClimaRioPreto(){
    const apiClimaResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${process.env.APIKEY_CLIMA}&lang=pt_br`);


    const responseJson = await apiClimaResponse.json();


    const climaBlackRiver = {id:201};

    if (climaBlackRiver.id === 800) {
        emojiDoDia = '☀';
        //console.log('☀')
    }else if (climaBlackRiver.id > 800) {
        emojiDoDia = '⛅';
        //console.log('⛅')
    }else if (climaBlackRiver.id >= 700 && climaBlackRiver.id < 800) {
        emojiDoDia = '☁';
        //console.log('☁')
    } else if (climaBlackRiver.id >= 500 && climaBlackRiver.id < 600) {
        emojiDoDia = '🌧';
        //console.log('🌧')
    } else if (climaBlackRiver.id >= 300 && climaBlackRiver.id < 400) {
        emojiDoDia = '🌦';
        //console.log('🌦')
    } else if (climaBlackRiver.id >= 200 && climaBlackRiver.id < 300) {
        emojiDoDia = '⛈';
        //console.log('⛈')
    }

    console.log(emojiDoDia)

    return emojiDoDia;
}

module.exports = { pegaClimaRioPreto };
