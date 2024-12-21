import fs from "node:fs";
import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { Method, RouteHandlerFunction } from "./Router/handler";
import type { Router } from "./Router/router";
import { execHandlers } from "./execHandlers";

export function Cristalyx(
  httpServerIntance: Server,
  router: Router<RouteHandlerFunction>,
): CristalyxApp {
  if (!httpServerIntance) {
    throw new Error("httpServerIntance is required");
  }

  // Evento Request:
  httpServerIntance.on("request", (request, response) => {
    const body: any[] = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        const request_body_data = body.length > 0 ? Buffer.concat(body).toString("utf-8") : "";

        const method_parsed = request.method as Method;
        const url_parsed = request.url as string;

        const handlers = router.match(method_parsed, url_parsed);

        if (handlers.length === 0) {
          response.statusCode = 404;
          response.end("Not Found");
          return;
        }

        execHandlers(
          handlers,
          Object.assign(request, { body: request_body_data }),
          parseResponse(response),
        );
      });

    // ERRORS
    response.on("error", (err) => {
      console.error({ err });
    });
  });

  return Object.assign(httpServerIntance, {
    get(path: string, ...handlers: RouteHandlerFunction[]) {
      router.add("GET", path, ...handlers);
    },
    post(path: string, ...handlers: RouteHandlerFunction[]) {
      router.add("POST", path, ...handlers);
    },
    put(path: string, ...handlers: RouteHandlerFunction[]) {
      router.add("PUT", path, ...handlers);
    },
    delete(path: string, ...handlers: RouteHandlerFunction[]) {
      router.add("DELETE", path, ...handlers);
    },
    patch(path: string, ...handlers: RouteHandlerFunction[]) {
      router.add("PATCH", path, ...handlers);
    },
  });
}

export type CristalyxApp = Server & {
  get: (path: string, ...handlers: RouteHandlerFunction[]) => void;

  post: (path: string, ...handlers: RouteHandlerFunction[]) => void;

  put: (path: string, ...handlers: RouteHandlerFunction[]) => void;

  delete: (path: string, ...handlers: RouteHandlerFunction[]) => void;

  patch: (path: string, ...handlers: RouteHandlerFunction[]) => void;
};

export function parseResponse(response: ServerResponse) {
  return Object.assign(response, {
    status: (statusCode: number): ServerResponse<IncomingMessage> => {
      response.statusCode = statusCode;
      return response;
    },
    sendFile: (filePath: string): void => {
      response.setHeader("Content-Type", "text/html");
      fs.createReadStream(filePath).pipe(response);
    },
    json: (data: any): void => {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    },
    text: (data: any): void => {
      response.setHeader("Content-Type", "text/plain");
      response.end(data);
    },
  });
}
