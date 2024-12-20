export class TreeRouter {
  private routes: Record<string, TreeNode> = {};
  public methods: string[] = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD",
    "ALL",
  ];

  constructor(methods?: string[]) {
    if (methods) {
      this.methods = methods;
    }
    for (const m of this.methods) {
      this.routes[m] = this.generate_base_node();
    }
  }

  add(method: string, path: string, ...handlers: TreeNodeHandler[]): void {
    const path_steps = [
      "/",
      ...new URL(path, "http://base.com").pathname
        .split("/")
        .filter((p) => p !== ""),
    ];

    if (!this.routes[method]) {
      throw new Error(`method ${method} not supported`);
    }

    this.insert(path_steps, this.routes[method], handlers);
  }

  match(method: string, path: string): TreeNodeHandler[] {
    const path_steps = [
      "/",
      ...new URL(path, "http://base.com").pathname
        .split("/")
        .filter((p) => p !== ""),
    ];

    if (!this.routes[method]) {
      throw new Error(`method ${method} not supported`);
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
    start_node: TreeNode
  ): TreeNodeHandler[] {
    if (path_steps.length === 0) throw new Error("path_steps can't be empty'");

    let current_node: TreeNode = start_node;
    const handlers: TreeNodeHandler[] = [...current_node.value.handlers];

    for (const p of path_steps) {
      for (const n of current_node.children) {
        if (n.value.key === p) {
          current_node = n;
          handlers.push(...current_node.value.handlers);
          break;
        }
      }
    }

    return handlers;
  }

  private insert(
    path_steps: string[],
    current_node: TreeNode,
    handlers: TreeNodeHandler[]
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

    let next_node: TreeNode | null = null;

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

export type TreeNode = {
  value: TreeNodeValue;
  children: TreeNode[];
};

export type TreeNodeValue = {
  key: string;
  handlers: TreeNodeHandler[];
};

export type TreeNodeHandler = string;

