interface Libro{
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
};

let catalogo: Libro[] = [
    { isbn: "1", titulo: "El Quijote", autor: "Cervantes", precio: 2000, disponible: true },
    { isbn: "2", titulo: "Rayuela", autor: "Cortázar", precio: 2500, disponible: true }
];

const filtroAutor = document.getElementById("filtroAutor") as HTMLInputElement | null;
const filtrar = document.getElementById("filtrar") as HTMLButtonElement | null;
const dispo = document.getElementById("mostrarDisponibles") as HTMLButtonElement | null;
const todos = document.getElementById("mostrarTodos") as HTMLButtonElement | null;
const lista = document.getElementById("listado") as HTMLUListElement | null;
const estadisticas = document.getElementById("stats") as HTMLParagraphElement | null;

function precioPromedio(libros: Libro[]): number{
    if (libros.length === 0) return 0;
    const total = libros.reduce((acum,libro) => acum + libro.precio, 0);
    return (total/libros.length);
};

function buscarPorAutor(autor : string): Libro[] {
    const busqueda = autor.trim().toLowerCase();
    if (busqueda === "") return [];
    return catalogo.filter(aut => aut.autor.toLowerCase() === busqueda);
};

function librosDisponibles (): Libro[] {
    return catalogo.filter(disp => disp.disponible);
};

function renderizar(libros: Libro[]): void {
    if (!lista || !estadisticas ) return;

    lista.innerHTML = "";

    if (libros.length === 0){
        estadisticas.textContent=`No se encontro ningun libro`
        return;
    }

    libros.forEach(libro => {
        const item = document.createElement("li");
        const boton = document.createElement("button")
        boton.textContent = `Eliminar libro`
        item.textContent = `autor: ${libro.autor} // titulo: ${libro.titulo} // precio: ${libro.precio}`;
        lista.appendChild(item);
        item.appendChild(boton)
        boton.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        })
    });
    
    estadisticas.textContent = `cantidad: ${libros.length} // precio promedio ${precioPromedio(libros)}`; 
};

const agregarLibro = (libro: Libro): void =>{
    catalogo.push(libro)
    renderizar(catalogo)
};

const eliminarLibro = (isbn: string): void => {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
};

const validarFormulario = (): Libro | null => {
    const titulo = document.getElementById("titulo") as HTMLInputElement;
    const autor = document.getElementById("autor") as HTMLInputElement;
    const genero = document.getElementById("genero") as HTMLInputElement;
    const precio = document.getElementById("precio") as HTMLInputElement;
    
    if( (titulo.value.trim() === "") || (autor.value.trim() === "") || (genero.value.trim() === "") || (isNaN(parseFloat(precio.value))  || parseFloat(precio.value) === 0)){
        return null;
    }
    
    const nuevoLibro: Libro = {
        isbn: `AUTO- ${Date.now()}`,
        titulo: titulo.value,
        autor: autor.value,
        precio: parseFloat(precio.value),
        disponible: true, //asumo que si se agrega un libro nuevo al catalogo es porque esta en disponibilidad
        genero: genero.value,
    }

    return nuevoLibro;
}


if (filtrar && filtroAutor){
    filtrar.addEventListener("click", () =>{
        renderizar(buscarPorAutor(filtroAutor.value))
    });
}; //Filtro de libros por autores

if (dispo){
    dispo.addEventListener("click", () => {
        renderizar(librosDisponibles())
    });
} //Filtro por disponibilidad

if(todos){
    todos.addEventListener("click", () => {
        renderizar(catalogo)
    });
} //Mostrar todos

const btnAgregar = document.getElementById("agregar") as HTMLButtonElement | null;

if (btnAgregar){
    btnAgregar.addEventListener("click", e =>{
        e.preventDefault();

        const libro = validarFormulario();
        const err = document.getElementById("errorForm") as HTMLDivElement | null;

        if (libro){
            agregarLibro(libro);
            const form = document.getElementById("formu") as HTMLFormElement | null;
            if (form) form.reset();
            if (err) err.textContent = "";
            (document.getElementById("titulo") as HTMLInputElement).focus();
        } else {
            if (err) err.textContent = `Error. Datos del formulario invalidos`;
        };
    });
};

renderizar(catalogo); //carga el catalogo por default