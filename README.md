# APLICACIONES DISTRIBUIDAS – 202551
## Carrera de Ingeniería en Tecnologías de la Información – ESPE

Esta práctica fue desarrollada en clases de la asignatura Aplicaciones Distribuidas. En ella se implementó una aplicación usando el ORM Sequelize con PostgreSQL y Express.

## Instrucciones para ejecutar el proyecto

### Instalar dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

    npm install

### Configurar variables de entorno

Crea un archivo llamado .env en la raíz del proyecto y copia las variables que se encuentran en .env.example.

### Crear la base de datos

En PostgreSQL, crea una base de datos con el nombre: biblioteca_orm

### Generar las tablas
Ejecuta el siguiente archivo para crear las tablas en la base de datos:

    node crear-tablas.js


Iniciar la aplicación
Puedes iniciar el proyecto con cualquiera de los siguientes comandos:

    npm start
o
    npm run dev
