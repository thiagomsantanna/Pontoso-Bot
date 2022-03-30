module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(mensagem){
        const conteudoMensagem = mensagem.content.toLowerCase();
        const horarioMensagem = new Date(mensagem.createdTimestamp).getHours();
        const user = mensagem.author;
        var deuBomdia = false;
    
        if (horarioMensagem >= 11 && horarioMensagem <= 15) {
    
            conteudoMensagem.includes('tard') && user.id == '247110573848788992' ? deuBomdia = true : deuBomdia = false;
        }
    
        deuBomdia ? mensagem.react('🤗') : deuBomdia = false;
    }
}