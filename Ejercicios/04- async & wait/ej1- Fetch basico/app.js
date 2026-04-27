"use strict";
;
async function obtenerUsuario() {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    try {
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch (error) {
        console.error(`Error al obtener usuarios: ${error}`);
        return [];
    }
}
obtenerUsuario().then(usuarios => {
    usuarios.forEach(i => {
        console.log(`Nombre: ${i.name} || email: ${i.email}`);
    });
});
