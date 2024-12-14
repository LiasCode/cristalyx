import { type Method, type RouteListener, routesStorage } from "./router";

export function findHandlers(routePath: string, method: Method): RouteListener[] | null {
  if (!routesStorage[method]) return null;
  let middlewares: RouteListener[] = [];
  let routeListeners: RouteListener[] = [];

  // Search Middlewares
  for (const routeItem of routesStorage.MIDDLEWARES) {
    if (typeof routeItem.route === "string") {
      if (routeItem.route === routePath) {
        middlewares = routeItem.listeners;
        break;
      }
    } else if (typeof routeItem.route === "function") {
      if (routeItem.route(routePath)) {
        middlewares = routeItem.listeners;
        break;
      }
    }
  }

  // Search Route Listeners
  for (const routeItem of routesStorage[method]) {
    if (typeof routeItem.route === "string") {
      if (routeItem.route === routePath) {
        routeListeners = routeItem.listeners;
        break;
      }
    } else if (typeof routeItem.route === "function") {
      if (routeItem.route(routePath)) {
        routeListeners = routeItem.listeners;
        break;
      }
    }
  }

  // Merge, always first middlewares
  return [...middlewares, ...routeListeners];
}
