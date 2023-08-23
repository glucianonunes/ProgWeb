const jogadas = ["Papel", "Pedra", "Tesoura"]
let pontos = 0

function derrota(sua_jogada, jogada_oponente){
    if ((sua_jogada == 1 && jogada_oponente == 3) || (sua_jogada == 2 && jogada_oponente == 1) || (sua_jogada == 3 && jogada_oponente == 2)){
        return true;
    } 
    return false;
}

console.log("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura")
let sua_jogada = parseInt(prompt())
let jogada_oponente = Math.floor(Math.random() * 3 + 1);
console.log("O computador jogou " + jogadas[jogada_oponente-1])
while((sua_jogada == 1 || sua_jogada == 2 || sua_jogada == 3) && !(derrota(sua_jogada, jogada_oponente))){
    if (sua_jogada == jogada_oponente){
        console.log("A rodada empatou!")
    }    
    else{
        console.log("Você ganhou!")
        pontos++;
    }
    sua_jogada = parseInt(prompt())
    jogada_oponente = Math.floor(Math.random() * 3 + 1);
    console.log("O computador jogou " + jogadas[jogada_oponente-1])

}
console.log("Você perdeu! A sua pontuação foi de " + pontos)
