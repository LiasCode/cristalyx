import { LinearRouter } from "./LinearRouter";

const linearRouter = new LinearRouter<string>(["GET", "POST"]);

linearRouter.add("GET", "/", "h-1", "h-2");

linearRouter.add("GET", "/api", "h-3", "h-4");

linearRouter.add("GET", "/static", "h-5");

linearRouter.add("GET", "/api/health", "h-6", "h-7");

linearRouter.add("POST", "/api/user", "h-8", "h-9");

const match_result = linearRouter.match("GET", "/api/health");

// console.log(linearRouter.toString());

console.log(JSON.stringify(match_result, null, 2));
