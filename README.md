# Proyecto de Validación de Tarjetas de Crédito

Este es un proyecto de ejemplo que implementa un sistema de validación de tarjetas de crédito utilizando el algoritmo de Luhn, encriptacion aes-256-gcm y generacion de tokens random para usarlo en la aplicacion real en una aplicación NestJS, con Azure Functions localmente y SQL Server de Azure para consultar nombres de empresas.

# Instalacion de Librerias

npm i

Este proyecto usa node packet manager version 9.8.1, con Node version 18.18.2 y Nest version 8.2.3

# Configuracion

Como se usa la base de datos de Azure SQL Server antes de que inicien agradecería que me dieran su ip y la mascara para poder darles acceso a la base de datos

Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno adecuadas en un archivo `.env` para el ambiente local con Nest y para el ambiente local
de azure por favor cambiar tu archivo `local.settings.json` con lo siguiente:

Utilizar el siguiente formato:

- ENCRYPTION_KEY=TuClaveDeEncriptación  
  DATABASE_HOST=TuHostDeBaseDeDatos
  DATABASE_PORT=TuPuertoDeBaseDeDatos  
  DATABASE_USERNAME=TuUsuarioDeBaseDeDatos  
  DATABASE_PASSWORD=TuContraseñaDeBaseDeDatos  
  DATABASE_NAME=TuNombreDeBaseDeDatos

La base de datos hace una búsqueda a una colección llamada Comercios, si quisiera generar a su base de datos estos datos por favor realice la siguiente consulta:

-- Crear una tabla llamada Comercios
CREATE TABLE Comercios (
ID INT PRIMARY KEY IDENTITY(1,1), -- Clave primaria autoincremental
Nombre NVARCHAR(255),
Descripcion NVARCHAR(1000),
Tipo NVARCHAR(100)
);

-- Insertar 10 registros en la tabla Comercios
INSERT INTO Comercios (Nombre, Descripcion, Tipo)
VALUES
('Comercio 1', 'Descripción 1', 'Tipo 1'),
('Comercio 2', 'Descripción 2', 'Tipo 2'),
('Comercio 3', 'Descripción 3', 'Tipo 3'),
('Comercio 4', 'Descripción 4', 'Tipo 4'),
('Comercio 5', 'Descripción 5', 'Tipo 5'),
('Comercio 6', 'Descripción 6', 'Tipo 6'),
('Comercio 7', 'Descripción 7', 'Tipo 7'),
('Comercio 8', 'Descripción 8', 'Tipo 8'),
('Comercio 9', 'Descripción 9', 'Tipo 9'),
('Comercio 10', 'Descripción 10', 'Tipo 10');

## Comandos

npm run start:dev => Para iniciar el proyecto localmente con Nest sin usar Azure Functions
npm run start:azure => Para iniciar el proyecto localmente con Azure Functions

## Enviroment Variables

Las variables de entorno estan en local.settings.json en Azure Functions para que corran con npm run start:azure, asi como tambien en un archivo .env para que corran localmente solo con npm run start:dev

## Pruebas

Se realizaron pruebas a los servicios de encriptacion y validacion del numero de la tarjeta de credito de credit-cards-controllers, para probarlos usar
npm run test:watch
