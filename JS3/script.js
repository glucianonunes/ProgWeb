

document.addEventListener("DOMContentLoaded", function() {
    class IntegerSet {
        constructor(maximo) {
            this.maximo = maximo;
            this.conjunto = Array(maximo + 1).fill(false);
        }
        
        insere(numero) {
            this.conjunto[numero] = true;
        }
    
        exclui(numero) {
            this.conjunto[numero] = false;
        }
    
        toString() {
            let string = "";
            for (let i = 0; i <= this.maximo; i++) {
                if (this.conjunto[i] === true) {
                    string += `${i} `;
                }
            }
            return string;
        }
    
        uniao(conj){
            for(let i = 0; i <= conj.maximo; i++){
                if (conj.conjunto[i] == true){
                    this.insere(i);
                }
            }
        }
    
        diferenca(conj){
            for(let i = 0; i <= conj.maximo; i++){
                if (this.conjunto[i] == true && conj.conjunto[i] == true){
                    this.exclui(i)
                }
            }
        }
    
        intersecao(conj){
            for(let i = 0; i <= this.maximo; i++) {
                if (!(this.conjunto[i] == true && conj.conjunto[i] == true)){
                    this.exclui(i)
                }
            }
        }
    }
    
    let conj1 = new IntegerSet(20);
    let conj2 = new IntegerSet(20);
    
    let p1 = document.getElementById("p1")
    let p2 = document.getElementById("p2")
    
    let botaoInserir1 = document.getElementById("inserir1")
    let botaoInserir2 = document.getElementById("inserir2")
    
    let botaoExcluir1 = document.getElementById("excluir1")
    let botaoExcluir2 = document.getElementById("excluir2")
    
    let botaoDiferenca = document.getElementById("diferenca")
    let botaoUniao = document.getElementById("uniao")
    let botaoIntersecao = document.getElementById("intersecao")
    
    let input1 = document.getElementById("conjunto1")
    let input2 = document.getElementById("conjunto2")
    
    botaoInserir1.addEventListener("click", function(){
        conj1.insere(input1.value);
        console.log(conj1.toString())
        p1.textContent = "Conjunto 1: " + conj1.toString()
    })

    botaoInserir2.addEventListener("click", function(){
        conj2.insere(input2.value);
        console.log(conj2.toString())
        p2.textContent = "Conjunto 2: " + conj2.toString()
    })

    botaoExcluir1.addEventListener("click", function(){
        conj1.exclui(input1.value);
        console.log(conj1.toString())
        p1.textContent = "Conjunto 1: " + conj1.toString()
    })

    botaoExcluir2.addEventListener("click", function(){
        conj2.exclui(input2.value);
        console.log(conj2.toString())
        p2.textContent = "Conjunto 2: " + conj2.toString()
    })

    botaoDiferenca.addEventListener("click", function(){
        conj1.diferenca(conj2);
        console.log(conj1.toString())
        p1.textContent = "Conjunto 1: " + conj1.toString()
    })

    botaoIntersecao.addEventListener("click", function(){
        conj1.intersecao(conj2);
        console.log(conj1.toString())
        p1.textContent = "Conjunto 1: " + conj1.toString()
    })

    botaoUniao.addEventListener("click", function(){
        conj1.uniao(conj2);
        console.log(conj1.toString())
        p1.textContent = "Conjunto 1: " + conj1.toString()
    })
});

