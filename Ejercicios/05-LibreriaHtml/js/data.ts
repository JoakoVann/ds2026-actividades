interface Libro {
    title: string;
    author_name?: string[];
    cover_i?: number;
    key: string;
}


const btnBusqueda = document.getElementById("btnBuscar") as HTMLButtonElement;
const filtro = document.getElementById("busqueda") as HTMLInputElement;
const resultados = document.getElementById("resultados") as HTMLDivElement | null;

async function buscarLibros(busqueda: string){
    const buscador = `https://openlibrary.org/search.json?title=${encodeURIComponent(busqueda)}`;
        const rta = await fetch(buscador);

        if(!rta.ok) throw new Error("Error en la busqueda de libros");
        const datos = await rta.json();
        return datos.docs
}

const renderizarRes = (libros: Libro[]) => {
    if (!resultados) return;

    resultados.innerHTML= ``;

    if (libros.length === 0) {
        resultados.innerHTML=`
            <div class="alert alert-danger" role="alert">
                NO SE ENCONTRARON LIBROS
            </div>
        `;
        return;
    }

    libros.forEach(l => {
        const imgUrl: string = l.cover_i
        ? `https://covers.openlibrary.org/b/id/${l.cover_i}-M.jpg` 
        : 'https://placehold.co/300x400?text=Sin+Portada';

        const autor: string = l.author_name ? l.author_name[0]: "Autor Desconocido";

        const tarjeta = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 border border-secondary-subtle">
                    <img src="${imgUrl}" class="card-img-top" alt="${l.title}" style="object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${l.title}</h5>
                        <p class="card-text">${autor}</p>
                    </div>
                </div>
            </div>`;
        
        resultados.insertAdjacentHTML("beforeend", tarjeta);
    });
}

btnBusqueda.addEventListener("click", async ()=>{
    const busqueda = filtro.value || "";

    if(busqueda.trim() !== ""){
        if (resultados){
            resultados.innerHTML=`
                <div class="text-center w-100 py-5">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>`;
        }
    } else {
        if (resultados){
            resultados.innerHTML=
            `<div class="alert alert-danger" role="alert">
                Ingrese un autor valido
            </div>
            `;}
    }
    
    try {
        if (resultados){
            resultados.innerHTML=`
                <p class="text-uppercase fs-3 fw-bold">Buscando Libros.... </p>
            `;
        }
        const libros = await buscarLibros(busqueda);
        renderizarRes(libros);
    } catch (error) {
        if(resultados){
            resultados.innerHTML=`
            <div class="alert alert-danger" role="alert">
                Error en la busqueda
            </div>
        `;
        }
    }
});
