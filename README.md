### Cristalyx

`Cristalyx` es una librería que envuelve el módulo `http.createserver` para crear servidores de forma rápida y sencilla.

Inspirada en [`Express`](https://expressjs.com/)

<h5>DISCLAIMER</h5>

> - Esta librería solo tiene el fin de estudiar y profundizar en el funcionamiento de frameworks de servidores web
> - No pretende ser sustitución y mucho menos usada en produccion.
> - Las características, funcionalidades y diseño de la api podrán cambiar libremente y sin retrocompatibilidad.
> - Se irán añadiendo funcionalidades, siempre con el objetivo de que tenga una api sencilla y se mantenga el rendimiento

#### Características:

- Api similar a la de express
  - Enrutador
  - Middlewares
- Totalmente tipado con Typescript
- Permite personalizar el Matcher de las rutas, con funciones creadas a gusto del desarrollador

#### Ruta de desarrollo

- [ ] Enrutador modular
- [ ] Integrar un validador de schemas para las request
- [ ] Integrar middleware para servir archivos estáticos
- [ ] Integrar middleware para la subida de archivos
- [ ] Añadir testing


##### Inspiraciones:

- [`Express`](https://expressjs.com/)
- [`Hono`](https://hono.dev/)