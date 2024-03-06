import { Method, RouteListener, routesStorage } from "./router";


export function findHandlers(routePath: string, method: Method): RouteListener[] | null {
  if (!routesStorage[method]) return null;

  for (const routeItem of routesStorage[method]) {
    if (routeItem.route === routePath) return routeItem.listeners;
  }
  return null;
}
