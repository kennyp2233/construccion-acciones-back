# Nombre del estudiante: Kenny Pinchao
# Tema: Práctica 4 - Volúmenes

## 1. Volumen Host

### Error 403 Forbidden al Acceder al Servidor de Nginx
El servidor de Nginx muestra el error 403 Forbidden, indicando que comprende la solicitud pero se niega a responder.
![Error 403 Forbidden](https://i.imgur.com/T1NNPZ1.png)

### Ausencia del Archivo index.html en el Contenedor
La falta del archivo index.html dentro del contenedor resulta en la ausencia de cualquier contenido visual.

### Despliegue Tras Incorporar la Plantilla Requerida
Al introducir la plantilla solicitada, se visualiza el resultado esperado:
![Despliegue Correcto](https://i.imgur.com/5NQkILT.png)

### Recreación del Contenedor con el Mismo Volumen Host
Al recrear el contenedor con los mismos volúmenes, los archivos previamente en la carpeta del host están disponibles nuevamente en el contenedor. Esto implica que el sitio web previamente configurado será desplegado de manera intacta.

### Comando `pwd` para Mostrar el Directorio Actual
El comando `pwd` (print working directory) muestra la ruta completa del directorio actual en la línea de comandos o terminal.

## 2. Wordpress

### Creación de la Red `net-wp`
![Creación de la Red](https://i.imgur.com/cFXiv5K.png)

### Almacenamiento de la Información en MySQL
El comando `-v /my/own/datadir:/var/lib/mysql` monta el directorio `/my/own/datadir` desde el sistema host como `/var/lib/mysql` dentro del contenedor, donde MySQL escribe sus archivos de datos de forma predeterminada.

### Creación del Contenedor de MySQL en la Red `net-wp`
![Creación del Contenedor MySQL](https://i.imgur.com/eO1Yle8.png)

### Almacenamiento de la Información en Wordpress
La información de Wordpress se encuentra en el directorio `/var/www/html`.

### Creación del Contenedor de Wordpress en la Red `net-wp`
![Creación del Contenedor Wordpress](https://i.imgur.com/X5Q5Uvb.png)

### Personalización de la Apariencia de Wordpress y Agregar una Entrada
#### Página de Ejemplo Modificada:
![Página Modificada](https://i.imgur.com/PTT0qH8.png)
#### Nueva Entrada Creada:
![Nueva Entrada](https://i.imgur.com/RlwBvsd.png)

### Eliminación y Recreación del Contenedor
Al eliminar y recrear el contenedor, las modificaciones realizadas en la página y la entrada creada persisten independientemente de la existencia del contenedor. Los datos se mantienen.

# 3. Volumen Nombrado

## Creación de Volumen
![Creación de Volumen](https://i.imgur.com/wSaHEok.png)

## Mountpoint del Volumen `vol-postgres`
Para obtener el Mountpoint del volumen `vol-postgres`, se usa el comando `docker volume inspect vol-postgres`. El resultado mostrará el Mountpoint:
![Mountpoint de vol-postgres](https://i.imgur.com/VDIFROp.png)

## Acceso al Mountpoint
Se utiliza el siguiente comando Docker para acceder al Mountpoint: `docker run -it -v vol-postgres:/tmp ubuntu bash`. Esto crea un contenedor de Ubuntu con acceso al contenido del volumen `vol-postgres` en `/tmp`, permitiendo explorar y modificar los datos dentro de ese volumen desde el contenedor Ubuntu. Al acceder al directorio "tmp", inicialmente estará vacío ya que aún no está montado en un contenedor:
![Acceso al Mountpoint](https://i.imgur.com/X6SBNwF.png)

### Creación de Red para Postgres
![Creación de Red](https://i.imgur.com/u84YHhO.png)

## Cambios en `vol-postgres`
Ahora, `vol-postgres` contiene los datos del contenedor al que está montado, en este caso "server-postgres". En la imagen siguiente se muestra que el directorio "tmp" no está vacío:
![Datos en vol-postgres](https://i.imgur.com/ptvoZT8.png)

# 4. Volumen Anónimo

## Creación de Contenedor con Volumen Anónimo
![Creación de Contenedor](https://i.imgur.com/CZbFhNl.png)

## Eliminación
![Eliminación](https://i.imgur.com/zIqejkY.png)
