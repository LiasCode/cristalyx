import { TreeRouter } from "./TreeRouter";

const treeRouter = new TreeRouter();

treeRouter.add("GET", "/", "h-1", "h-2");

treeRouter.add("GET", "/api", "h-3", "h-4");

treeRouter.add("GET", "/static", "h-5");

treeRouter.add("GET", "/api/health", "h-6", "h-7");

treeRouter.add("POST", "/api/user", "h-8", "h-9");

const res = treeRouter.match("GET", "/api/user");

console.log(treeRouter.toString());

console.log(JSON.stringify(res, null, 2));

