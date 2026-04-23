
function generarArbol() {
    const input = document.getElementById("numero");
    const valor = input.value;
    if (valor === "" || Number(valor) < 1) {
        let resul = document.getElementById("resultado");
        resul.textContent = "Error. Numero invalido";
        return;
    }
    ;
    let resultado = "";
    for (let i = 1; i <= Number(valor); i++) {
        for (let j = 0; j < i; j++) {
            resultado += "*";
        }
        ;
        resultado += "\n";
    }
    ;
    document.getElementById("resultado").textContent = resultado;
};
