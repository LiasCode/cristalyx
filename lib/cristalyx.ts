import http from "node:http";
import fs from "node:fs";
import { type CristalyxRouter, type Method, Router } from "./router";
import { findHandlers } from "./findHandlers";
import { execHandlers } from "./execHandlers";

/**
 * Create a Cristalyx Server App
 * @param httpServerIntance
 * @returns
 */
export function Cristalyx(
  httpServerIntance: http.Server = http.createServer(),
): http.Server & CristalyxRouter {
  if (!httpServerIntance) {
    throw new Error("httpServerIntance is required");
  }

  // Evento Request:
  httpServerIntance.on("request", (request, response) => {
    const body: any[] = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        const requestBodyData = body.length > 0 ? Buffer.concat(body).toString("utf-8") : "";

        const methodParsed: Method = request.method as Method;

        const urlParsed = new URL(`http://${process.env.HOST ?? "localhost"}${request.url}`);

        const handlers = findHandlers(urlParsed.pathname, methodParsed);

        if (!handlers) {
          response.statusCode = 404;
          response.end("Not Found");
          return;
        }

        execHandlers(
          handlers,
          Object.assign(request, { body: requestBodyData }),
          parseResponse(response),
        );
      });

    // ERRORS
    response.on("error", (err) => {
      console.error({ err });
    });
  });

  return Object.assign(httpServerIntance, Router());
}

export function parseResponse(response: http.ServerResponse) {
  return Object.assign(response, {
    status: (statusCode: number): http.ServerResponse<http.IncomingMessage> => {
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
