# Pontoso Bot

 - Bot que realiza a marcação de ponto no discord

## Comandos

- `/ponto`: comando para inicialização do ponto, podendo ser passado um horário especifico para inicialização ao invés do horário atual.
- `/esquecidoalmoco`: comando para inserção de um horário de Intervalo específico também.

## Utilização

Sua utilização é bem simples, apenas necessário sua inicialização pelo comando `/ponto` e para marcação de eventuais intervalos e horário de saída pelos emojis abaixo da mensagem enviada pelo Bot, que são respectivamente:
- `'⛅'` : Responde com uma mensagem temporária motivacional de Bom dia!
- `'🍽'` : Insere o horário atual como momento de Intervalo.
- `'↩'` : Insere o horário atual como momento de Retorno do Intervalo.
- `'👋'` : Insere o horário atual como momento de Saída.
- Exemplo:
  - ![image](https://user-images.githubusercontent.com/67112597/155347087-4488357f-5e21-41f2-8b8c-f4aa8fcb132f.png)

## Como instalar o Pontoso
- Instalar o node
- Rodar no cmd `npm install`
- Logo depois `npm start`

## ENV VARS - Variáveis de Ambiente
- BOT_TOKEN: É o token do Bot no Discord, serve para identificar que o Bot é o Bot
- CLIENT_ID: É o id do servidor do Discord onde o Bot vai rodar
- GUILD_ID_SALESOFT: É o id do canal do Discord onde o Bot vai funcionar
- REDIS_URL: É a url do redis seguindo o padrão `connection_string` `redis://localhost:6379`