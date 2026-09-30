# Tp_04_Web_con_EJS_Mascotas_Adopcion
Aplicacion Web con EJS de Mascotas en Adopcion

## Descripción
Aplicación web desarrollada con Express para gestionar un catálogo de mascotas disponibles para adopción. Permite listar, ver detalle, agregar nuevas mascotas mediante formulario y manejar estados de adopción.

## Instalación
npm init -y
npm install express ejs express-ejs-layouts


## Ejecución
Para iniciar el servidor en modo desarrollo:
npm start

La aplicación correra en http://localhost:3000.

# Páginas y rutas
    GET /                   Página inicial con mensaje de bienvenida.
    GET /mascotas           Listado de mascotas disponibles para adopción.
    GET /mascotas/nueva     Formulario para agregar una nueva mascota.
    GET /mascotas/:id       Detalle de una mascota específica por su identificador.
    POST /mascotas          Procesa el formulario y agrega una nueva mascota.

## Estructura de vistas
Las vistas están organizadas en la carpeta views y utilizan EJS con un layout principal:

    Layout: plantilla base compartida (cabecera, pie, estilos).
    Vista: página completa renderizada para una ruta específica (ej. lista, detalle, nueva).
    Parcial: fragmento reutilizable incluido en layouts o vistas (ej. ecabezado, pie).

## Recursos estáticos
    Los archivos estáticos (CSS, imágenes, scripts) se sirven desde la carpeta public mediante:

    app.use(express.static(path.join(__dirname, "..", "public")));

## Formulario
    El unico formulario es para agregar mascotas con los siguientes campos:

    Nombre
    Especie
    Edad
    Descripción
    Estado (En Adopción, Reservada, Adoptada)

    La validación asegura que todos los campos estén completos y que la edad sea un número válido mayor o igual a 0.
    En caso de error, se muestra un mensaje en la misma vista.

## Persistencia de los datos
    Los datos se mantienen en memoria en un arreglo mascotas.
    Al enviar un POST válido, se agrega un nuevo objeto y se redirige con 302 al listado.
    Al reiniciar el servidor, el arreglo se vuelve a cargar con los cinco registros iniciales, por lo que el nuevo registro desaparece. Esto ocurre porque no hay persistencia en disco (no se guarda en archivo ni base de datos).


*************************************************************************************************
Respuestas:
# diferencia entre layout, vista y parcial
    * Layout referencia la Plantilla General o Archivo Maestro que define la estructura común del sitio web.  (main.ejs)
    * View es el contenido principal que representa las página web específicas a la que entramos. (main,detalle,lista,nueva,encabezado,etc)
    * Partials son componentes o fragmentos de codigo reutilizables de código HTML en su mayoria pequeños y aislados que se crean para usarse diferentes lugares y varia veces (encabezado,pie).

# datos enviados a una vista mediante res.render
    Son los datos de la vista que puedes imprimir directamente en el código HTML.

# función de express.static
    Esta funcion le indica servidor dónde están guardados los archivos estáticos, es decir, los archivos que no cambian y que el navegador web necesita para que la página funcione y se vea bien (imagenes,estilos css)

# función de express.urlencoded
    Sirve para que mi servidor de Express pueda entender y leer los datos que envío a través de un formulario HTML.

# recorrido POST, redirección y GET
    Post: Envia los datos del formulario para crear o ejectura lo solicitado.
    Redirect: Una ves cargados los datos enviados nos redirecciona a la pagina o endpoint que le indique.
    Get: Nos trae o visualiza el contenido de la pagina o endpont que solicito ("/" Pag ppal, "/mascotas" Listado de Mascotas, "/mascotas/detalle" Detalle de cada mascota, etc)

# motivo por el cual el nuevo registro desaparece al reiniciar.
    Al ejecutar POST /mascotas, el servidor agrega un objeto al arreglo mascotas.
    Ese arreglo esta en la memoria del proceso de Node.js mientras el servidor está corriendo (no en disco).
    Al detener el servidor (Ctrl + C) o reiniciarlo, la memoria se borra y el arreglo vuelve a inicializarse con los cinco registros iniciales.
    Como nunca se escribe en un archivo ni en una base de datos, los cambios no persisten entre ejecuciones.