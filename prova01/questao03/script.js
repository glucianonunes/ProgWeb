addEventListener('DOMContentLoaded', ()=> {


    const botao = document.getElementById("botao")
    let result = document.getElementById("result")


    addEventListener('click', function (){
        let A = this.window.prompt("Digite um número: ");
        let B = this.window.prompt("Digite outro número: ");
        result.textContent= "A soma entre " + A + " e " + B + " é igual a " + (parseInt(A)+parseInt(B)).toString() + "!";
    })

})
