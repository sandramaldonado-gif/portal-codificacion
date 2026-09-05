# Portal de Solicitudes de Codificación

Proyecto web desarrollado en React para registrar y consultar solicitudes de codificación de artículos. Su propósito es organizar la recepción de información, evitar solicitudes incompletas y facilitar el seguimiento mediante un folio.

## Objetivo

Desarrollar una primera versión funcional de un portal que permita capturar los datos de una solicitud, validar los campos obligatorios, guardar la información y consultar posteriormente su estado.

## Funcionalidades del Sprint 1

- Página de inicio y navegación.
- Formulario para registrar solicitudes.
- Validación de campos obligatorios.
- Generación automática de folios.
- Almacenamiento de solicitudes en el navegador.
- Consulta de solicitudes mediante folio.
- Visualización del estado de la solicitud.
- Diseño adaptable para computadora y celular.

## Historias desarrolladas

| ID | Historia | Estado |
|---|---|---|
| PB-01 | Estructura visual y navegación | Terminada |
| PB-02 | Formulario de solicitud | Terminada |
| PB-03 | Validación de campos | Terminada |
| PB-04 | Registro y almacenamiento de solicitudes | Terminada |
| PB-05 | Generación de folio | Terminada |
| PB-12 | Diseño responsivo | Terminada |

## Tecnologías utilizadas

- React
- JavaScript
- HTML
- CSS
- Vite
- LocalStorage
- Git y GitHub

## Funcionamiento

El usuario captura los datos del artículo en el formulario. Después de validar la información, el sistema genera un folio con el siguiente formato:

`COD-AÑO-NÚMERO`

Ejemplo:

`COD-2026-0001`

La solicitud se guarda en LocalStorage y puede consultarse desde el mismo navegador mediante el folio generado.

## Instalación y ejecución

Para descargar y ejecutar el proyecto se necesitan Node.js y npm.

```bash
git clone https://github.com/sandramaldonado-gif/portal-codificacion.git
cd portal-codificacion
npm install
npm run dev
```

## Acceso local al portal

Una vez ejecutado el comando `npm run dev`, se debe abrir en el navegador la dirección proporcionada por Vite, normalmente:

[http://localhost:5173/](http://localhost:5173/)

Esta dirección funciona únicamente en el equipo donde se está ejecutando el proyecto y mientras el servidor de desarrollo permanece activo.

## Aplicación de Scrum

El proyecto se organizó mediante un Product Backlog. Durante el Sprint 1 se seleccionaron las historias necesarias para crear una primera versión funcional del portal.

La meta del sprint fue permitir que el usuario registrara una solicitud completa, recibiera un folio y pudiera consultar posteriormente la información guardada.

Para el desarrollo se aplicaron las siguientes actividades:

- Planeación de las historias que formarían parte del Sprint 1.
- Desarrollo de la navegación y del formulario.
- Validación de los campos obligatorios.
- Pruebas de registro y generación de folios.
- Pruebas de consulta de solicitudes.
- Revisión del diseño en computadora y celular.
- Identificación de posibles mejoras para los siguientes sprints.

## Almacenamiento

Esta versión utiliza LocalStorage, por lo que los registros permanecen solamente en el navegador y equipo donde fueron creados. En una versión futura podría incorporarse una base de datos para permitir el acceso desde distintos dispositivos.

## Autora

Sandra Maldonado González  
Licenciatura en Desarrollo de Sistemas Web