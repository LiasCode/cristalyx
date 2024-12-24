import type { Method } from "../handler";
import type { Router } from "../router";

export class LinearRouter<RouteHandler> implements Router<RouteHandler> {
  private routes: Record<string, LinearNode<RouteHandler>[]> = {};
  public methods: Method[] = ["ALL"];

  constructor(methods?: Method[]) {
    if (methods) {
      this.methods = methods;
    }
    for (const m of this.methods) {
      this.routes[m] = [];
    }
  }

  add(method: string, path: string, ...handlers: RouteHandler[]): void {
    const path_parsed = path;

    if (!this.routes[method]) {
      throw new Error(
        `[LinearRouter:add], method ${method} not supported, add it to the constructor`,
      );
    }

    for (const n of this.routes[method]) {
      if (n.path === path_parsed) {
        n.handlers.push(...handlers);
        return;
      }
    }

    this.routes[method].push({
      path: path_parsed,
      handlers: [...handlers],
    });
  }

  match(method: string, path: string): RouteHandler[] {
    const path_parsed = path;

    if (!this.routes[method]) {
      throw new Error(
        `[LinearRouter:match], method ${method} not supported, add it to the constructor`,
      );
    }

    for (const n of this.routes[method]) {
      if (n.path === path_parsed) {
        return n.handlers;
      }
    }

    return [];
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}

export type LinearNode<T> = {
  path: string;
  handlers: T[];
};
