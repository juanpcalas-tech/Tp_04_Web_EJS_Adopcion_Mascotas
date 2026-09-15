# Tp_04_Web_con_EJS_Mascotas_Adopcion
Aplicacion Web con EJS de Mascotas en Adopcion

## Descripción
Aplicación web desarrollada con Node.js, Express y EJS para gestionar un listado de mascotas en adopción.
Permite visualizar mascotas disponibles, ver detalles individuales y agregar nuevas mediante un formulario.

## Instalación
npm init -y
npm install express ejs express-ejs-layouts


## Ejecución
Para iniciar el servidor en modo desarrollo:
npm start

La aplicación correra en http://localhost:3000.

# Páginas y rutas
/                       Página inicial con mensaje de bienvenida.

/mascotas               Listado de mascotas disponibles para adopción.

/mascotas/nuevamascota  Formulario para agregar una nueva mascota.

/mascotas/:id            Detalle de una mascota específica por su identificador.

POST /mascotas           Procesa el formulario y agrega una nueva mascota.

## Estructura de vistas
Las vistas están organizadas en la carpeta views y utilizan EJS con un layout principal:

layouts/main.ejs → Plantilla base.

comenzar.ejs → Página inicial.
mascotas/listaadopcion.ejs   ==> Listado de mascotas.
mascotas/detalleadopcion.ejs ==> Detalle de una mascota.
mascotas/nuevamascota.ejs    ==> Formulario de alta.
no_encontrado.ejs            ==> Página de error cuando no se encuentra una mascota.

## Recursos estáticos
Los archivos estáticos (CSS, imágenes, scripts) se sirven desde la carpeta public mediante:

app.use(express.static(path.join(__dirname, "..", "public")));

## Formulario
El unico formulario es para agregar mascotas con los siguientes campos:

Nombre
Especie
Edad
Descripción
Estado (En adopción, Reservada, Adoptada)

La validación asegura que todos los campos estén completos y que la edad sea un número válido mayor a 0.
En caso de error, se muestra un mensaje en la misma vista.

## Persistencia de los datos
Los datos de mascotas se leen inicialmente desde datos/mascotas.json.
Al agregar una nueva mascota, se actualiza el arreglo en memoria y se asigna un ID único.
Actualmente, los cambios no se guardan en el archivo JSON.
