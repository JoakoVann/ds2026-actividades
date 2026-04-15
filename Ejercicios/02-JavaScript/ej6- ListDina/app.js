const lista = document.getElementById("listaProductos");
const productos = [];

const crearBotonEliminar = (li) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Eliminar";
    boton.addEventListener("click", ()=>{
        li.remove();
        actCont();
    });
    return boton;
};

const actCont = () => {
    let cant = lista.children.length
    const contador = document.getElementById("cantProductos");
    contador.textContent = `La cantidad de productos es: ${cant}`;
};

const agregarProd = () => {
    const producto = document.getElementById("nomProd").value;
    if (!producto) {
        alert("Ingrese un producto");
        return;
    }
    productos.push(producto);
    const li = document.createElement("li");
    li.textContent = producto;

    const boton = crearBotonEliminar(li);
    boton.textContent = "eliminar";
    li.appendChild(boton);

    lista.appendChild(li);

    actCont();
};