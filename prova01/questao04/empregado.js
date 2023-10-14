/* Código desenvolvido corretamente */
/* Nota: 2.0 */

class empregado {
    constructor(nome, salario) {
        this.nome = nome
        this.salario = salario
    }

    getSalario() {
        return this.salario
    }

    setSalario(salario) {
        if (salario < 0) {
            console.log("ERRO. Número negativo inserido. Salário não poôde ser atualizado.")
        }
        else {
            this.salario = salario
        }
    }

    static somaSalarios(empregados) {
        let tamanho = empregados.length
        let soma = 0.00
        for (let i = 0; i < tamanho; i++) {
            soma = soma + empregados[i].getSalario()
        }
        return soma;
    }
}

emp1 = new empregado("Jorge", 1500.00)

emp2 = new empregado("Amanda", 2000.00)

console.log(emp1.getSalario())
console.log(emp2.getSalario())

emp1.setSalario(1650.00)
emp2.setSalario(2200.00)

console.log(emp1.getSalario())
console.log(emp2.getSalario())