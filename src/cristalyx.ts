import http from "node:http";
import fs from "node:fs";
import { Method } from "./router";
import { findHandlers } from "./findHandlers";
import { execHandlers } from "./execHandlers";

export function Cristalyx(httpServerIntance?: http.Server) {
  if (!httpServerIntance) {
    httpServerIntance = http.createServer();
  }

  //  Evento Request:
  httpServerIntance.on("request", (request, response) => {
    const body: any[] = [];

    request
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        const requestBodyData = Buffer.concat(body).toString("utf-8");

        const methodParsed: Method = request.method?.toUpperCase() as Method;

        const handlers = findHandlers(request.url!, methodParsed);

        if (!handlers) {
          response.statusCode = 404;
          response.end("Not Found");
          return;
        }

        execHandlers(
          handlers,
          Object.assign(request, { body: requestBodyData }),
          parseResponse(response)
        );
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

export function parseResponse(response: http.ServerResponse) {
  return Object.assign(response, {
    status: (statusCode: number) => {
      response.statusCode = statusCode;
    },
    sendFile: (filePath: string) => {
      response.setHeader("Content-Type", "text/html");
      fs.createReadStream(filePath).pipe(response);
    },
    json: (data: any) => {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    },
    text: (data: any) => {
      response.setHeader("Content-Type", "text/plain");
      response.end(data);
    },
  });
}
