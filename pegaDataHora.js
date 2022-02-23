
function datasHorasAgora(){

    let diaHoje = new Date().getDate();
    let minutosAgora = new Date().getMinutes();

    return dataHoras = {
        diaHoje: `${diaHoje <= 9 ? `0${diaHoje}` : diaHoje}`,
        mesHoje: `${new Date().getMonth() + 1}`,
        anoHoje: `${new Date().getFullYear()}`,
    
        minutosAgora: `${minutosAgora <= 9 ? `0${minutosAgora}` : minutosAgora}`,
        horasAgora: `${new Date().getHours()}`
    }
}

function pegaDataHora() {

    let dataHoras = datasHorasAgora();

    return `${dataHoras.diaHoje}/${dataHoras.mesHoje}/${dataHoras.anoHoje} - ${dataHoras.horasAgora}:${dataHoras.minutosAgora}`;
}

function pegaData(){

    let dataHoras = datasHorasAgora();

    return `${dataHoras.diaHoje}/${dataHoras.mesHoje}/${dataHoras.anoHoje}`;
}

module.exports = {
    pegaDataHora,
    pegaData
};