import type { Request, Response, RouteHandlerFunction } from "./Router/handler";

/**
 * Executes an array of route handler functions sequentially. Each handler
 * function is called with the request and response objects, and a `next`
 * callback function. If a handler calls the `next` callback, the execution
 * continues to the next handler in the array. If a handler does not call
 * the `next` callback, the execution stops.
 *
 * @param handlers - An array of route handler functions to be executed.
 * @param req - The native request object.
 * @param res - The native response object.
 */
export function execute_route_handlers(
  handlers: RouteHandlerFunction[],
  req: Request,
  res: Response,
): void {
  let next = false;

  for (const handler of handlers) {
    next = false;

    handler(req, res, () => {
      next = true;
    });

    if (next === false) break;
  }

  if (res.closed === false) {
    res.end();
  }
}
