import http from "node:http";

type Request = http.IncomingMessage;

type Response = {
  status: (statusCode: number) => void;
  sendFile: (filePath: string) => void;
  json: (data: any) => void;
  text: (data: any) => void;
};

type RouteListener = (req: Request, res: Response) => any;

type Route = { route: string; listeners: RouteListener[] };

type RoutesStorage = {
  GET: Route[];
  POST: Route[];
  PUT: Route[];
  DELETE: Route[];
};

const routesStorage: RoutesStorage = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
};

export function Router() {
  return {
    get(route: string, ...listeners: RouteListener[]) {
      routesStorage.GET.push({
        route,
        listeners,
      });
    },
    post(route: string, ...listeners: RouteListener[]) {
      routesStorage.POST.push({
        route,
        listeners,
      });
    },
    put(route: string, ...listeners: RouteListener[]) {
      routesStorage.PUT.push({
        route,
        listeners,
      });
    },
    delete(route: string, ...listeners: RouteListener[]) {
      routesStorage.DELETE.push({
        route,
        listeners,
      });
    },
  };
}

export function cristalyx(httpServerIntance?: http.Server) {
  if (!httpServerIntance) {
    httpServerIntance = http.createServer();
  }

  //  Evento REQUEST :
  httpServerIntance.on("request", (request, response) => {
    const body: any[] = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        const requestBodyData = Buffer.concat(body).toString("utf-8");
        response.end("");
      });

    // ## ERRORS
    response.on("error", (err) => {
      console.error({ err });
    });

    request.on("error", (err) => {
      console.error({ err });
    });
  });

  return httpServerIntance;
}
