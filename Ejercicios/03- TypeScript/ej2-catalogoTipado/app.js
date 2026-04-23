"use strict";
const catalogo = [
    { isbn: "1", titulo: "algo", autor: "Juan", precio: 10, disponible: true },
    { isbn: "2", titulo: "cosas", autor: "Pedro", precio: 20, disponible: false },
    { isbn: "3", titulo: "tremendo", autor: "Juan", precio: 10, disponible: true },
];
const filtroAutor = document.getElementById("filtroAutor");
const filtrar = document.getElementById("filtrar");
const dispo = document.getElementById("mostrarDisponibles");
const todos = document.getElementById("mostrarTodos");
const lista = document.getElementById("listado");
const estadisticas = document.getElementById("stats");
function buscarPorAutor(autor) {
    const busqueda = autor.trim().toLowerCase();
    if (busqueda === "")
        return [];
    return catalogo.filter(aut => aut.autor.toLowerCase() === busqueda);
}
;
function librosDisponibles() {
    return catalogo.filter(disp => disp.disponible);
}
;
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((acum, libro) => acum + libro.precio, 0);
    return (total / libros.length);
}
function renderizar(libros) {
    if (!lista || !estadisticas)
        return;
    lista.innerHTML = "";
    if (libros.length === 0) {
        estadisticas.textContent = `No se encontro ningun libro`;
        return;
    }
    libros.forEach(libro => {
        const item = document.createElement("li");
        item.textContent = `autor: ${libro.autor} // titulo: ${libro.titulo} // precio: ${libro.precio}`;
        lista.appendChild(item);
    });
    estadisticas.textContent = `cantidad: ${libros.length} // precio promedio ${precioPromedio(libros)}`;
}
if (filtrar && filtroAutor) {
    filtrar.addEventListener("click", () => {
        renderizar(buscarPorAutor(filtroAutor.value));
    });
}
;
if (dispo) {
    dispo.addEventListener("click", () => {
        renderizar(librosDisponibles());
    });
}
if (todos) {
    todos.addEventListener("click", () => {
        renderizar(catalogo);
    });
}
