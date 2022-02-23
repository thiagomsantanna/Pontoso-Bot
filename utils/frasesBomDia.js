let frases = ['Nesta manhã, te desejo apenas uma coisa: que você seja muito feliz! Um ótimo dia!', 'Que o Amor esteja presente do começo ao fim do seu dia!', 'Agradeço pelo sol, pelos astros e por ter você ao meu lado! Bom dia!', 'Tenha um bom dia, uma tarde produtiva e uma noite fantástica!', 'Para hoje, escolha brilhar! Bom dia!', 'Hoje será um dia lindo. Acorde e sorria!', 'A vida é curta e o tempo passa rápido demais. Aproveite cada instante. Bom dia!', 'A fé torna as coisas possíveis, não fáceis. Bom dia!']

function numeroAleatorio(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mensagemDeBomDia(){
    let _bomDia = frases[numeroAleatorio(frases.length - 1)];

    return _bomDia;
}


module.exports = { mensagemDeBomDia };