const { parseRequest } = require("./parseRequest");

function initEvents(httpServerIntance, routes) {
  if (!httpServerIntance) throw new Error("NO HTTP SERVER INSTANCE");
  if (!routes) throw new Error("NO ROUTES PROVIDED");

  //  Evento REQUEST :
  httpServerIntance.on("request", (request, response) => {
    const body = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        if (routes.length === 0) response.end("<h1>NO ROUTES ADDED</h1>");

        parseRequest(request, response, body);

        findMatchRoutes(request, response, routes);
      });

    // ## ERRORS
    response.on("error", (err) => {
      console.log({ err });
    });

    request.on("error", (err) => {
      console.log({ err });
    });
  });

  return httpServerIntance;
}

function findMatchRoutes(request, response, routes) {
  /*
    routes = {
      get : { route: "", listener: [() => {}] },
      post : { route: "", listener: [() => {}] },
      put : { route: "", listener: [() => {}] },
      delete : { route: "", listener: [() => {}] },
    }
  */

  const { method, url, headers, query, body } = request;

  // console.log({ method, url, headers, body, query, routes });

  let isExistMatchingRoute = true;

  for (let i = 0; i < routes[method].length; i++) {
    const cursorOnRoutes = routes[method][i];
    isExistMatchingRoute = true;

    let isMatchUrl = false;

    if (typeof cursorOnRoutes.route === "function") {
      isMatchUrl = cursorOnRoutes.route(url);
    } else if (typeof cursorOnRoutes.route === "string") {
      isMatchUrl = url === cursorOnRoutes.route;
    }

    if (!isMatchUrl) {
      isExistMatchingRoute = false;
      continue;
    }

    // Recorrer listeners de la ruta matcheada
    const listeners = cursorOnRoutes.listener;

    const next = {
      continue: false,
    };

    if (listeners.length === 1) {
      listeners[0](request, response);
      break;
    }

    for (let index = 0; index < listeners.length; index++) {
      const cursorOnListener = listeners[index];

      if (index === 0) {
        next.continue = true;
      }

      if (!next.continue) {
        break;
      }

      next.continue = false;
      cursorOnListener(request, response, () => (next.continue = true));
    }

    break;
  }

  if (!isExistMatchingRoute) {

    response.status(404).end(`
      <html>
        <head>
          <title>ERROR 404</title>
        </head>

        <body>
          <h3 style="color : red;">ERROR: 404</i> </h3>
          <h3 style="color : red;">No existe la direccion : <i>"${url}"</i> </h3>
        </body>
      </html>
    `);
  }
}

module.exports = { initEvents };
