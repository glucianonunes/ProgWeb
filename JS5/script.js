document.addEventListener("DOMContentLoaded", function() {    
    let botaoOk = document.getElementById("botao")

    let input1 = document.getElementById("bar1")
    let input2 = document.getElementById("bar2")
    let input3 = document.getElementById("bar3")
    let input4 = document.getElementById("bar4")
    let input5 = document.getElementById("bar5")

    let input6 = document.getElementById("larg")

    let di = document.getElementById("pai")
    let b1 = document.getElementById("b1")
    let b2 = document.getElementById("b2")
    let b3 = document.getElementById("b3")
    let b4 = document.getElementById("b4")
    let b5 = document.getElementById("b5")

    botaoOk.addEventListener("click", function() {
        let divs = [b1, b2, b3, b4, b5];
        let inputs = [input1, input2, input3, input4, input5];
        divs.forEach(function(div, index) {
            div.style.backgroundColor = "red";
            div.style.width = input6.value.toString() + "px";
            div.style.height = inputs[index].value.toString() + "px";
            div.style.display = "inline-block";
            div.style.marginRight = "10px"; 
        });
    });
});
