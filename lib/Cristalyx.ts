import fs from "node:fs";
import http from "node:http";
import type { IncomingMessage, Server, ServerResponse } from "node:http";
import { LinearRouter } from "./Router";
import type { Method, RouteHandlerFunction } from "./Router/handler";
import type { Router } from "./Router/router";
import { execute_route_handlers } from "./execute_route_handlers";

/**
 * Initializes the Cristalyx application with the provided HTTP server instance and router.
 *
 * @param httpServerIntance - The HTTP server instance to attach the Cristalyx application to.
 * @param router - The router instance to handle route matching and execution.
 * @returns The Cristalyx application instance with HTTP methods (GET, POST, PUT, DELETE, PATCH) attached.
 *
 * @throws {Error} If the `httpServerIntance` is not provided.
 *
 * @example
 * ```typescript
 * import path from "node:path";
 * import { Cristalyx } from "cristalyx";
 *
 * const PORT = 3000;
 *
 * const server = Cristalyx();
 *
 * server.listen(PORT, () => {
 *   console.log(`Server listen on http://localhost:${PORT}`);
 * });
 *
 * server.get("/", async (_, res) => {
 *   res.sendFile(path.join(__dirname, "public", "index.html"));
 * });
 * ```
 */
export function Cristalyx(
  httpServerIntance: Server = http.createServer(),
  router: Router<RouteHandlerFunction> = new LinearRouter([
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ]),
): CristalyxApp {
  if (!httpServerIntance) {
    throw new Error("httpServerIntance is required");
  }

  if (!router) {
    throw new Error("router is required");
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

        execute_route_handlers(
          handlers,
          Object.assign(request, { body: request_body_data }),
          parseResponse(response),
        ).catch(console.error);
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
