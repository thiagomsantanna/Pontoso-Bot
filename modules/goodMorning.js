const phrases = [
  "Nesta manhã, te desejo apenas uma coisa: que você seja muito feliz! Um ótimo dia!",
  "Que o Amor esteja presente do começo ao fim do seu dia!",
  "Agradeço pelo sol, pelos astros e por ter você ao meu lado! Bom dia!",
  "Tenha um bom dia, uma tarde produtiva e uma noite fantástica!",
  "Para hoje, escolha brilhar! Bom dia!",
  "Hoje será um dia lindo. Acorde e sorria!",
  "A vida é curta e o tempo passa rápido demais. Aproveite cada instante. Bom dia!",
  "A fé torna as coisas possíveis, não fáceis. Bom dia!",
  "Hoje sua manhã será especial! Muito melhor que ontem e um aprendizado para amanhã. Hoje você tem a oportunidade de fazer as coisas diferentes! Um bom dia para você.",
  "Primeiro passo para se ter um bom dia: deseje o mesmo para alguém!",
  "A felicidade é algo interessante: quanto mais você divide, mais ela se multiplica. Bom dia!",
  "Bom dia! A cada nova manhã, nasce junto uma nova chance.",
  "O mundo é de quem busca o seu melhor todos os dias! Um bom dia para você.",
  "Bom dia! Se não puder fazer tudo, faça tudo o que puder.",
  "Bom dia! Viva simples, sonhe grande, seja grato, dê amor e ria muito.",
  "Que seja infinito o que nos faz bem. Um bom dia maravilhoso a todos!"
];

function getRandomPhrase() {
  const phrasesLength = phrases.length - 1;
  const randomNumber = Math.floor(Math.random() * phrasesLength);

  return phrases[randomNumber];
}

module.exports = getRandomPhrase;
