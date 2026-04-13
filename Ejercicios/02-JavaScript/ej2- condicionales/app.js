const clasificarNota = (nota) => {
    if (nota < 4){
        console.log("DESAPROBADO");
    } else if (nota > 4 & nota < 7){
        console.log("APROBADO");
    } else {
        console.log("PROMOCIONADO");
    }
};

const diaDeLaSemana = (dia) =>{
    switch (dia){
        case 1: console.log("LUNES");
        break;
        case 2: console.log("MARTES");
        break;
        case 3: console.log("MIERCOLES");
        break;
        case 4: console.log("JUEVES");
        break;
        case 5: console.log("VIERNES");
        break;
        case 6: console.log("SABADO (FIN DE SEMANA)");
        break;
        case 7: console.log("DOMINGO (FIN DE SEMANA)");
        break;
        default: console.warn("DIA INVALIDO");
    };
};