'use strict'
// desde la consola se le pasa
// node calculadora.js parametro1 parametro2
var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla = `
    La suma es: ${numero1 + numero2}
    La resta es: ${numero1 - numero2}
    La multiplicacion es: ${numero1 * numero2}
    La division es: ${numero1 / numero2}
`;
console.log(plantilla);
console.log("Hola mundo con NodeJs");