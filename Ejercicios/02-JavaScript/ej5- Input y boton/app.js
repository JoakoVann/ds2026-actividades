const generar = () => {
    const inputNumero = document.getElementById("numero").value;
    const salida = document.getElementById("salida");

    if (inputNumero === null || inputNumero <= 0){
        document.getElementById("resultado").textContent = "Error: numero invalido";
        return;
    };

    let resultado = "";

    for (let i = 1; i <= inputNumero; i++){
        for (j = 0; j < i; j++){
            resultado += "*";
        };
        resultado += "\n";
    };
    document.getElementById("resultado").textContent = resultado;
};