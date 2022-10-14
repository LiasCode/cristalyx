const http = require("http");
const { mergeObjects } = require("./helpers/mergeObjects");
const { initEvents } = require("./initEvents");

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
    static(route, ...listener) {
      routes.push({
        method: "GET",
        route,
        listener,
      });
    },
  };

  // MERGE OBJECTS
  mergeObjects(appServer, router);

  return appServer;
}

module.exports = cristalyx;
