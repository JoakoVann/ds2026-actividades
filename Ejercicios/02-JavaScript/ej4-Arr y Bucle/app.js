const numeros = [3, 8, 5, 6, 7, 9, 10, 1230];

let sumaTot = 0 
let prom = 0;

for(const numero of numeros){
    sumaTot += numero;
};

prom = sumaTot/numeros.length;
const max = Math.max(...numeros);
const min = Math.min(...numeros);

console.log(`La suma total es: ${sumaTot}, El promedio es: ${prom}. El maximo es: ${max} y el minimo es: ${min}`);

const generarAsteriscos = (cant) =>{
    let asteriscos = "";
    for (let i = 0; i < cant; i++){
        asteriscos+="*";
    }
    console.log(`${asteriscos}`);
};