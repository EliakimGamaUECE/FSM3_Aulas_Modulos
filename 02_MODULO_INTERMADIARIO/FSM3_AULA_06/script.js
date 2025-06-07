//********ATIVIDADE ANTERIOR */

// function ehPalindromo(n) {
//     let original = n;
//     let invertido = 0;

//     while (n > 0) {
//         let resto = n % 10;
//         invertido = invertido * 10 + resto;
//         n = (n - resto) / 10;

//         document.writeln(resto)
//         document.writeln(invertido)
//         document.writeln(`${n}<br><br>`)
//     }

//     return invertido === original;
// }

// document.writeln(ehPalindromo(1001));

//********ARMAZENAMENTO LOCAL********

//INSERIR 1 ELEMENTO

// localStorage.setItem("Nome2","Paulo Henrique")

//PEGAR 1 ELEMENTO

// document.writeln(localStorage.getItem("Nome1"))

//APAGAR 1 ELEMENTO

// localStorage.removeItem("Nome")

//LIMPAR O LOCAL STORAGE

// localStorage.clear()

//INSERIR VÁRIOS ELEMENTOS

// let frutas = ["maça","banana","laranja","goiaba","limão","jaca"]



//PEGAR VÁRIOS ELEMENTOS



//********MÉTODOS EM JS********

let frutas = ["maça","banana","laranja","goiaba","limão","jaca"]

//INSERIR UM ELEMENTO NO ARRAY

frutas.push("abacaxi")

// console.log(frutas)


//ITERAR SOBRE OS ELEMENTOS OPERANDO SOBRE CADA 1
//1-ESCOLHER O MÉTODO
//2-CRIAR A FUNÇÃO
//3-CHAMAR A FUNÇÃO NO MÉTODO

//FORMA COMPLETA === GRANDE
// const somaCom2 = (n => n + 2)
// let num = [2,5,15,10]

// let num_novos = num.map(somaCom2)
// console.log(num_novos)

//FORMA MEDIA
// let num = [2,5,15,10]
// let num_novos = num.map(n => n + 2)
// console.log(num_novos)

//FORMA CURTA
let num = [2,5,15,10].map(n => n * 5)
console.log(num)