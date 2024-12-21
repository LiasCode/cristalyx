### Cristalyx

`Cristalyx` es una pequeña librería para crear servidores http eficientes y sencillos.

##### DISCLAIMER

> - Esta librería solo tiene el fin de estudiar y profundizar en el funcionamiento de frameworks de servidores web
> - No pretende ser sustitución y menos aún usada en produccion.
> - Las características, funcionalidades y diseño de la api podrán cambiar libremente y sin retrocompatibilidad.
> - Se irán añadiendo funcionalidades, siempre con el objetivo de que tenga una api sencilla y se mantenga el rendimiento

#### Objetivos:

- Api sencilla similar a express
- Totalmente tipado con `Typescript`
- Permitir seleccionar entre distintos tipos de enrutadores como: `TreeRouter` y `LinearRouter`
- Añadir funcionalidades manteniendo el rendimiento

#### Ruta de desarrollo

- [X] Implementar enrutador `TreeRouter`
- [X] Implementar enrutador `LinearRouter`
- [ ] Enrutador modular
- [ ] Integrar un validador de schemas para las request
- [ ] Integrar middleware para servir archivos estáticos
- [ ] Integrar middleware para la subida de archivos
- [ ] Añadir testing


##### Inspiraciones:

- [`Express`](https://expressjs.com/)
- [`Hono`](https://hono.dev/)
