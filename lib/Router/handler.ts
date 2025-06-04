import type http from "node:http";

export type Request = http.IncomingMessage & {
  body: any;
};

export type Response = http.ServerResponse & {
  status: (statusCode: number) => void;
  sendFile: (filePath: string) => void;
  json: (data: any) => void;
  text: (data: any) => void;
};

export type RouteHandlerFunction = (req: Request, res: Response, next: () => void) => Promise<any>;

export type Method = string;
