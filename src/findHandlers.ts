import { Method, RouteListener, routesStorage } from "./router";

export function findHandlers(routePath: string, method: Method): RouteListener[] | null {
  if (!routesStorage[method]) return null;

  for (const routeItem of routesStorage[method]) {
    if (typeof routeItem.route === "string") {
      if (routeItem.route === routePath) return routeItem.listeners;
    } else if (typeof routeItem.route === "function") {
      if (routeItem.route(routePath)) return routeItem.listeners;
    }
  }
  return null;
}
