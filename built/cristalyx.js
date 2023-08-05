"use strict";
const http = require("http");
const { mergeObjects } = require("./helpers/mergeObjects");
const { initEvents } = require("./initEvents");
function cristalyx(dirname = process.cwd(), httpServerIntance = http.createServer()) {
    if (!dirname)
        throw new Error("SE DEBE ANADIR EL __DIRNAME");
    process.chdir(dirname);
    const routes = {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: [],
    };
    const appServer = initEvents(httpServerIntance, routes);
    const router = {
        get(route, ...listener) {
            routes["GET"].push({
                route,
                listener,
            });
        },
        post(route, ...listener) {
            routes["POST"].push({
                route,
                listener,
            });
        },
        put(route, ...listener) {
            routes["PUT"].push({
                route,
                listener,
            });
        },
        delete(route, ...listener) {
            routes["DELETE"].push({
                route,
                listener,
            });
        }
    };
    mergeObjects(appServer, router);
    return appServer;
}
module.exports = cristalyx;
