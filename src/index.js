const path = require("node:path");
const express = require("express");
const { leerJsonMascotas } = require("./archivos");
const expressLayouts = require("express-ejs-layouts");
const rutasMascotas = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
    const app = express();
    const PORT = 3000;

    const mascotas = await leerJsonMascotas(rutasMascotas);
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));

    app.use(expressLayouts);
    app.set("layout", "layouts/main");

    app.use(express.static(path.join(__dirname, "..", "public")));

    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
        res.render("comenzar", { titulodetalle: "Adopcion de Mascotas" });
    });

    app.get("/mascotas", (req, res) => {
        res.render("mascotas/listaadopcion", { titulodetalle: "Mascotas Disponibles para Adopción", mascotas });
    });

    app.get("/mascotas/nuevamascota", (req, res) => {
        res.render("mascotas/nuevamascota", {
            titulodetalle: "Agregar Nueva Mascota",
            error: null,
            valores: {},
        });
    });


    app.get("/mascotas/:id", (req, res) => {
        const id = Number(req.params.id);
        const mascota = mascotas.find((elemento) => elemento.id === id);
        if (!mascota) {
            return res.status(404).render("no_encontrado", {
                titulodetalle: "Mascota no encontrada",
                mensaje: "No existe una mascota con ese identificador.",
            });
        }
        res.render("mascotas/detalleadopcion", {
            titulodetalle: mascota.nombre,
            mascota,
        });
    });

    app.post("/mascotas", (req, res) => {
        const { nombre, especie, edad, descripcion, estado } = req.body;
        const nombreLimpio = String(nombre ?? "").trim();
        const especieLimpia = String(especie ?? "").trim();
        const descripcionLimpia = String(descripcion ?? "").trim();
        const edadNumerica = Number(edad ?? NaN);
        const estadoLimpio = String(estado ?? "").trim();   
        if (
            !nombreLimpio ||
            !especieLimpia ||
            !descripcionLimpia ||
            !Number.isFinite(edadNumerica) ||
            edadNumerica < 0 ||
            !estadoLimpio
        ) {
            return res.status(400).render("mascotas/nuevamascota", {
                titulodetalle: "Agregar Nueva Mascota",
                error: "Completá todos los campos con valores válidos.",
                valores: req.body,
            });
        }
        const ultimoId = mascotas.reduce(
            (mayorId, mascota) => Math.max(mayorId, mascota.id),
            0,
        );
        mascotas.push({
            id: ultimoId + 1,
            nombre: nombreLimpio,
            especie: especieLimpia,
            edad: edadNumerica,
            descripcion: descripcionLimpia,
            estado: estadoLimpio,
            imagen: "img/mascota.svg"
        });
        res.redirect("/mascotas");
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo Correctamente en http://localhost:${PORT}`);
    });
};

main(); 
