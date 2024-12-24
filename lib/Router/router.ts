export interface Router<RouteHandler> {
  add(method: string, path: string, ...handlers: RouteHandler[]): void;

  match(method: string, path: string): RouteHandler[];
}
