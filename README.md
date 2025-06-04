### Cristalyx

`Cristalyx` is a small library for creating efficient and simple HTTP servers.

##### DISCLAIMER

> - This library is solely for the purpose of studying and delving into the operation of web server frameworks.
> - It is not intended as a substitute for, and even less for use in, production.
> - The features, functionalities, and API design may change freely and without backward compatibility.
> - Functionalities will be added gradually, always with the goal of maintaining a simple API and preserving performance.

#### Goals:

- Simple API similar to Express
- Fully typed with `Typescript`
- Allow selection between different router types, such as `TreeRouter` and `LinearRouter`
- Add functionalities while maintaining performance

#### Development Roadmap

- [X] Implement `TreeRouter`
- [X] Implement `LinearRouter`
- [ ] Modular router
- [ ] Integrate a schema validator for requests
- [ ] Integrate middleware for serving static files
- [ ] Integrate middleware for file uploads
- [ ] Add testing

##### Inspirations:

- [`Express`](https://expressjs.com/)
- [`Hono`](https://hono.dev/)
