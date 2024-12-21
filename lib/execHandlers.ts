import type { Request, Response, RouteHandlerFunction } from "./Router/handler";

export function execHandlers(handlers: RouteHandlerFunction[], req: Request, res: Response) {
  let next = false;
  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    next = false;

    handler(req, res, () => {
      next = true;
    });

    if (next === false) break;
  }
}
