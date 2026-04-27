interface Usuario{
    id: number;
    name: string;
    email: string;
    phone: string;
};

async function obtenerUsuario() : Promise<Usuario[]>  {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    try {
        if (!respuesta.ok){
        throw new Error(`HTTP ${respuesta.status}`);
        }
        const usuarios: Usuario[] = await respuesta.json();
        return usuarios;
    } catch (error) {
        console.error(`Error al obtener usuarios: ${error}`);
        return [];
    }
}

obtenerUsuario().then(usuarios => {
    usuarios.forEach(i =>{
        console.log(`Nombre: ${i.name} || email: ${i.email}`);
    });
});