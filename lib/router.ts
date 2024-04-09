import http from "node:http";

export type Request = http.IncomingMessage & {
  body: any;
};

export type Response = http.ServerResponse & {
  status: (statusCode: number) => void;
  sendFile: (filePath: string) => void;
  json: (data: any) => void;
  text: (data: any) => void;
};

export type RouteListener = (req: Request, res: Response, next: () => void) => any;

type RouteMatcher = string | ((path: string) => boolean);

type Route = { route: RouteMatcher; listeners: RouteListener[] };

type RoutesStorage = {
  GET: Route[];
  POST: Route[];
  PUT: Route[];
  DELETE: Route[];
  MIDDLEWARES: Route[];
};

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export const routesStorage: RoutesStorage = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
  MIDDLEWARES: [],
};

export type CristalyxRouter = {
  get(route: RouteMatcher, ...listeners: RouteListener[]): void;
  post(route: RouteMatcher, ...listeners: RouteListener[]): void;
  put(route: RouteMatcher, ...listeners: RouteListener[]): void;
  delete(route: RouteMatcher, ...listeners: RouteListener[]): void;
  use(route: RouteMatcher, ...listeners: RouteListener[]): void;
};

export function Router(): CristalyxRouter {
  return {
    get(route: RouteMatcher, ...listeners: RouteListener[]) {
      const routeHandlerIndex = routesStorage.GET.findIndex((r) => r.route === route);
      if (routeHandlerIndex === -1) {
        routesStorage.GET.push({
          route,
          listeners,
        });
        return;
      }
      routesStorage.GET[routeHandlerIndex].listeners.push(...listeners);
    },
    post(route: RouteMatcher, ...listeners: RouteListener[]) {
      const routeHandlerIndex = routesStorage.POST.findIndex((r) => r.route === route);
      if (routeHandlerIndex === -1) {
        routesStorage.POST.push({
          route,
          listeners,
        });
        return;
      }
      routesStorage.POST[routeHandlerIndex].listeners.push(...listeners);
    },
    put(route: RouteMatcher, ...listeners: RouteListener[]) {
      const routeHandlerIndex = routesStorage.PUT.findIndex((r) => r.route === route);
      if (routeHandlerIndex === -1) {
        routesStorage.PUT.push({
          route,
          listeners,
        });
        return;
      }
      routesStorage.PUT[routeHandlerIndex].listeners.push(...listeners);
    },
    delete(route: RouteMatcher, ...listeners: RouteListener[]) {
      const routeHandlerIndex = routesStorage.DELETE.findIndex((r) => r.route === route);
      if (routeHandlerIndex === -1) {
        routesStorage.DELETE.push({
          route,
          listeners,
        });
        return;
      }
      routesStorage.DELETE[routeHandlerIndex].listeners.push(...listeners);
    },
    use(route: RouteMatcher, ...listeners: RouteListener[]) {
      const routeHandlerIndex = routesStorage.MIDDLEWARES.findIndex((r) => r.route === route);
      if (routeHandlerIndex === -1) {
        routesStorage.MIDDLEWARES.push({
          route,
          listeners,
        });
        return;
      }
      routesStorage.MIDDLEWARES[routeHandlerIndex].listeners.push(...listeners);
    },
  };
}
