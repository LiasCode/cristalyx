import { RouteListener, Request, Response } from "./router";

export function execHandlers(handlers: RouteListener[], req: Request, res: Response) {
  let next: boolean = false;

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    next = false;

    handler(req, res, () => {
      next = true;
    });

    if (!next) break;
  }
}
