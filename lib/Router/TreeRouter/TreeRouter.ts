import type { Method } from "../handler";
import type { Router } from "../router";

export class TreeRouter<RouteHandler> implements Router<RouteHandler> {
  private routes: Record<string, TreeNode<RouteHandler>> = {};
  public methods: Method[] = ["ALL"];

  constructor(methods?: Method[]) {
    if (methods) {
      this.methods = methods;
    }
    for (const m of this.methods) {
      this.routes[m] = this.generate_base_node();
    }
  }

  add(method: string, path: string, ...handlers: RouteHandler[]): void {
    const path_steps = [
      "/",
      ...new URL(path, "http://base.com").pathname.split("/").filter((p) => p !== ""),
    ];

    if (!this.routes[method]) {
      throw new Error(`[TreeRouter:add] method ${method} not supported, add it to the constructor`);
    }

    this.insert(path_steps, this.routes[method], handlers);
  }

  match(method: string, path: string): RouteHandler[] {
    const path_steps = [
      "/",
      ...new URL(path, "http://base.com").pathname.split("/").filter((p) => p !== ""),
    ];

    if (!this.routes[method]) {
      throw new Error(
        `[TreeRouter:match] method ${method} not supported, add it to the constructor`,
      );
    }

    return this.find_node_handlers(path_steps, this.routes[method]);
  }

  private generate_base_node() {
    return {
      value: {
        key: "/",
        handlers: [],
      },
      children: [],
    };
  }

  private find_node_handlers(
    path_steps: string[],
    start_node: TreeNode<RouteHandler>,
  ): RouteHandler[] {
    if (path_steps.length === 0) throw new Error("path_steps can't be empty'");

    let current_node: TreeNode<RouteHandler> = start_node;
    // const handlers: RouteHandler[] = [...current_node.value.handlers];

    for (const p of path_steps) {
      for (const n of current_node.children) {
        if (n.value.key === p) {
          current_node = n;
          // handlers.push(...current_node.value.handlers);
          break;
        }
      }
    }

    return current_node.value.handlers;
  }

  private insert(
    path_steps: string[],
    current_node: TreeNode<RouteHandler>,
    handlers: RouteHandler[],
  ): void {
    if (path_steps.length === 0) throw new Error("path_steps can't be empty'");

    const [current_step, ...next_steps] = path_steps;

    if (current_node.value.key !== current_step) {
      return;
    }

    if (next_steps.length === 0) {
      current_node.value.handlers.push(...handlers);
      return;
    }

    if (current_node.children.length === 0) {
      current_node.children.push({
        value: {
          key: next_steps[0],
          handlers: [],
        },
        children: [],
      });
    }

    let next_node: TreeNode<RouteHandler> | null = null;

    for (const n of current_node.children) {
      if (n.value.key === next_steps[0]) {
        next_node = n;
        break;
      }
    }

    if (next_node === null) {
      next_node = {
        value: {
          key: next_steps[0],
          handlers: [],
        },
        children: [],
      };
      current_node.children.push(next_node);
    }

    this.insert(next_steps, next_node, handlers);
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}

export type TreeNode<T> = {
  value: TreeNodeValue<T>;
  children: TreeNode<T>[];
};

export type TreeNodeValue<T> = {
  key: string;
  handlers: T[];
};
