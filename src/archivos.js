const fs = require("node:fs/promises");

async function leerJsonMascotas(rutaDatosMascota) {
    try {
        const mascotas = await fs.readFile(rutaDatosMascota, "utf-8");
        return JSON.parse(mascotas);

    } catch (error) {
        throw new Error(`El archivo ${rutaDatosMascota} no existe.`);
    }
}

module.exports = {
    leerJsonMascotas,
};