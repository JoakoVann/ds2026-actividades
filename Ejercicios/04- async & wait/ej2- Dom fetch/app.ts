interface Usuario{
    id: number;
    name: string;
    email: string;
    phone: string;
};

const estado = document.getElementById("estado") as HTMLParagraphElement | null;
const listaUsers = document.getElementById("listaUsuarios") as HTMLUListElement | null;

async function obtenerUsuario() : Promise<Usuario[]>  {
    if(estado){
        estado.textContent=`Cargando...`
    };
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!respuesta.ok){
        throw new Error(`HTTP ${respuesta.status}`);
        }
        const usuarios: Usuario[] = await respuesta.json();
        if(estado){
            estado.textContent="";
        }
        return usuarios;
    } catch (error) {
        if (estado){
            estado.textContent = `Error al obtener usuarios: ${error}`;
            estado.style.color = "red";
        }
        return [];
    }
}

obtenerUsuario().then(usuarios=>{
    usuarios.forEach(user=>{
        const item = document.createElement("li");
        item.textContent = `Nombre: ${user.name} | Email: ${user.email}`;
        if (listaUsers){
            listaUsers.appendChild(item);
        }
    })
})