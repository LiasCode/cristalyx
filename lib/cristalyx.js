const fs = require("fs");
const http = require("http");

function cristalyx(httpServerIntance = http.createServer()) {
  const routes = [];
  const appServer = initEvents(httpServerIntance, routes);

  const router = {
    get(route, ...listener) {
      routes.push({
        method: "GET",
        route,
        listener,
      });
    },
    post(route, ...listener) {
      routes.push({
        method: "POST",
        route,
        listener,
      });
    },
    delete(route, ...listener) {
      routes.push({
        method: "DELETE",
        route,
        listener,
      });
    },
    patch(route, ...listener) {
      routes.push({
        method: "PATCH",
        route,
        listener,
      });
    },
    put(route, ...listener) {
      routes.push({
        method: "PUT",
        route,
        listener,
      });
    },
    static (route , ...listener) {
      routes.push({
        method: "GET",
        route,
        listener,
      });
    }
  };

  // MERGE OBJECTS
  mergeObjects(appServer, router);

  return appServer;
}

function initEvents(httpServerIntance = http.createServer(), routes) {
  if (!httpServerIntance) throw new Error("NO HTTP SERVER INSTANCE");
  if (!routes) throw new Error("NO ROUTES PROVIDED");

  //  Evento REQUEST :
  httpServerIntance.on("request", (request, response) => {
    let body = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        if (routes.length === 0) response.end("<h1>NO ROUTES ADDED</h1>");

        parseRequest(request, response, body);

        const { method, url, headers, query } = request;

        console.log({ method, url, headers, body, query });

        // routes = [{ method: "GET", route: "", listener: [() => {}] }];
        let isExistMatchingRoute = true;

        for (let i = 0; i < routes.length; i++) {
          const cursorOnRoutes = routes[i];
          isExistMatchingRoute = true;
          
          let matchUrl = false;

          if (typeof cursorOnRoutes.route === "function") {
            matchUrl = cursorOnRoutes.route(url);
          }
          else if (typeof cursorOnRoutes.route === "string"){
            matchUrl = (url === cursorOnRoutes.route);
          }

          // Recorrer listeners de la ruta matcheada 
          if (matchUrl && method === cursorOnRoutes.method) {
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

          isExistMatchingRoute = false;
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

function parseRequest(request, response, body) {
  body = Buffer.concat(body).toString("utf-8");
  request.body = body;

  response.status = (newStatus) => {
    response.statusCode = newStatus;
    return response;
  };

  response.sendFile = (url) => {
    fs.createReadStream(url).pipe(response);
  };

  response.json = (data) => {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(data));
  };

  // parseando el query en la url :
  let query = {};
  let urlSplited = [];
  let queryUnparsed = "";

  if (request.url.includes("?")) {
    urlSplited = request.url.split("?");
    queryUnparsed = urlSplited[1].split("&");

    queryUnparsed.forEach((el) => {
      let elSplited = el.split("=");
      query[elSplited[0]] = elSplited[1];
    });

    request.url = urlSplited[0];
    request.query = query.length ? query : "";
  } else {
    request.query = "";
  }
}

function mergeObjects(target, ...objs) {
  Object.assign(target, ...objs);
}

function listenStatics(req, res) {
  const { url } = req;
  
}

module.exports = cristalyx;
