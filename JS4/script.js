document.addEventListener("DOMContentLoaded", function() {    
    let botaoOk = document.getElementById("ok")
    
    let input1 = document.getElementById("raio")
    let input2 = document.getElementById("area")
    let input3 = document.getElementById("circ")

    botaoOk.addEventListener("click", function(){
        input2.value = (input1.value * input1.value * 3.14159).toFixed(2).toString();
        input3.value = (2 * input1.value * 3.14159).toFixed(2).toString();
    })
});
