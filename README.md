# Pontoso Bot

 - Bot que realiza a marcação de ponto no discord

## Comandos

- `/ponto`          : comando para inicialização do ponto, podendo ser passado um horário especifico para inicialização ao invés do horário atual.
- `/esquecidoalmoco`: comando para inserção de um horário de Intervalo específico também.

## Utilização

Sua utilização é bem simples, apenas necessário sua inicialização pelo comando `/ponto` e para marcação de eventuais intervalos e horário de saída pelos emojis abaixo da mensagem enviada pelo Bot, que são respectivamente:
- `'⛅'`  : Responde com uma mensagem temporária motivacional de Bom dia!
- `'🍽'`  : Insere o horário atual como momento de Intervalo.
- `'↩'`   : Insere o horário atual como momento de Retorno do Intervalo.
- `'👋'`  : Insere o horário atual como momento de Saída.
- Exemplo:
  - ![image](https://user-images.githubusercontent.com/67112597/155347087-4488357f-5e21-41f2-8b8c-f4aa8fcb132f.png)

## Como instalar o Pontoso
- Requirements: Node.js (>=16.14.2), npm/yarn.

- Instalar as dependências: `npm install` ou `yarn install`.
- Startar o bot: `npm start` ou `yarn start`

#### Executar o Pontoso em ambiente de dev
- Tenha configurado um outro bot, diferente do usado para execução em ambiente produtivo.
- Tenha instalado na sua máquina Redis, para utilização do banco em localhost.
- Preencha as credênciais do bot no arquivo `.env.dev`
- Instalar as dependências com `npm install` ou `yarn install`.
- Startar o bot: `npm run dev` ou `yarn dev`.
- Convidar seu bot para um servidor para realização de testes.

## ENV VARS - Variáveis de Ambiente

- BOT_TOKEN : Token único do Bot, para autenticação do bot com a API do Discord.
- CLIENT_ID : Application ID / OAuth2 Client ID do Bot.
- REDIS_URL : URL do redis seguindo o padrão `connection_string` `redis://localhost:6379`.
- BOT_NAME  : Apenas necessário em caso de estar executando o Bot com um nome diferente de `Pontoso`.
