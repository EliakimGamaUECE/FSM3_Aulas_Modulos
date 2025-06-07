//EXPLICAÇÃO ##############################################

//FUNÇÕES TRADICIONAIS
// function soma(x,y){
//     let s = x+y
//     return s
// }

// function mult(x,y){
//    return x*y
// }

// function soma(x,y){
//    return x+y
// }

// function sub(x,y){
//    return x-y
// }

// function div(x,y){
//    return x/y
// }

// let a = 5
// let b = 87

// // document.writeln(div(a,b))

// function nome(nome){
//    return document.writeln(`Seja bem-vindo! ${nome}<br>`)
// }

// nome("Eliakim")
// nome("Eliakim")
// nome("Eliakim")
// nome("Eliakim")

//##############################################

//TAREFA 01
//BY CAROL E PEDRO
// function tipoTriangulo(lado1, lado2, lado3) {

//   const valido = (lado1 + lado2 > lado3) &&
//                 (lado1 + lado3 > lado2) &&
//                  (lado2 + lado3 > lado1);

//  if (!valido) {
//    return "Os lados informados não formam um triângulo.";
//   }


//   if (lado1 === lado2 && lado2 === lado3) {
//     return "Triângulo Equilátero (todos os lados iguais)";
//   } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
//    return "Triângulo Isósceles (dois lados iguais)";
//   } else {
//     return "Triângulo Escaleno (todos os lados diferentes)";
//   }
// }

// document.writeln(tipoTriangulo(5, 8, 4)); 

//var lado1 = 2;
//var lado2 = 4;
//var lado3 = 5;

//function calcularTipoTriangulo() {
// if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
// if (lado1 === lado2 && lado2 === lado3) {
//    return "Equilátero";
//} else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
//    return "Isósceles";
// } else {
//     return "Escaleno";
//  }
// }
//}

//console.log(calcularTipoTriangulo());


//TAREFA 01
//LUIS E VIVIAN

// function tipoTriangulo(a, b, c) {
//   if (a === 0 || b === 0 || c === 0) {
//     return "Triangulo invalido";
//   } else if (a + b < c || b + c < a || a + c < b) {
//     return "Triangulo invalido";
//   } else {
//     if (a == b && b == c) {
//       return "Triangulo equilatero";
//     } else if ((a == b && b != c) || (a == c && c != b) || (c == b && b != a)) {
//       return "Triangulo isosceles!";
//     } else {
//       return "Triangulo escaleno!";
//     }
//   }
// }

// document.writeln(tipoTriangulo(8, 5, 4));


//ARROW FUNCTIONS##############################################

// const soma = (x,y) => x+y
// const mult = (x,y) => x*y
// const div = (x,y) => x/y
// const sub = (x,y) => x-y

// document.writeln(sub(4,2))

function ehPalindromo(n) {
    let original = n;
    let invertido = 0;

    while (n > 0) {
        let resto = n % 10;
        invertido = invertido * 10 + resto;
        n = (n - resto) / 10; 
        document.writeln(`o valor de RESTO é ${resto}<br>`)
        document.writeln(`o valor de INVERTIDO é ${invertido}<br>`)
        document.writeln(`o valor de N é ${n}<br>`)
    }

    return invertido === original;
}

document.writeln(ehPalindromo(121));
