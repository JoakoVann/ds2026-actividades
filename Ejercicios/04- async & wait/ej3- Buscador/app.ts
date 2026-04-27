interface LibroOL{
    title: string;
    author_name?:string[];
    first_publish_year?:number;
}

const filtro = document.getElementById("filtro") as HTMLInputElement;
const btnBuscar = document.getElementById("buscar") as HTMLButtonElement;
const resUsers = document.getElementById("resultados") as HTMLDivElement;

async function buscarLibros(busqueda: string): Promise <LibroOL[]> {
    const rta = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}`);
    if(!rta.ok) throw new Error("Error en la busqueda de libros");
    
    const datos = await rta.json() as {docs: LibroOL[]};
    return datos.docs.slice(0,10);
}

const renderizarTarjetas = (libros : LibroOL[]) => {
    resUsers.innerHTML = ``;

    if(libros.length === 0){
        resUsers.innerHTML=`
            <p>No se encontraron resultados</p>
        `;
        return;
    }

    libros.forEach(libro => {
        const tarjeta = document.createElement("div");

        const nombreAutor = libro.author_name
        ? libro.author_name.join(", ")
        : "autor desconocido"
        tarjeta.innerHTML = `
            <h3>Titulo: ${libro.title} </h3>
            <p> Autor: ${nombreAutor} </p>
            <p> Año publicado : ${libro.first_publish_year || 'N/A'} </p>
        `;
        resUsers.appendChild(tarjeta);
    });
};

btnBuscar.addEventListener("click", async () => {
    const busqueda = filtro.value.trim();
    if (busqueda === "") {
        alert("Ingrese un autor");
        return;
    }
    try {
        resUsers.innerHTML = `Cargando .....`;
        const resul = await buscarLibros(busqueda);
        console.log(resul)
        renderizarTarjetas(resul);
    } catch (error) {
        resUsers.innerHTML = `
        <p style='color: red'>Error al buscar ${error}</p>
        `;
    };
});