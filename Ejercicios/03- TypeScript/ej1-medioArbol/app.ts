function generarArbol() {
    const input = document.getElementById("numero") as HTMLInputElement;
    const valor = input.value

    if (valor === "" || Number(valor) < 1){
        let resul = document.getElementById("resultado") as HTMLElement
        resul.textContent = "Error. Numero invalido"
        return;
    };

    let resultado = "";

    for (let i = 1; i <= Number(valor); i++){
        for (let j = 0; j < i; j++){
            resultado += "*";
        };
        resultado += "\n";
    };
    (document.getElementById("resultado") as HTMLHtmlElement).textContent = resultado;
};