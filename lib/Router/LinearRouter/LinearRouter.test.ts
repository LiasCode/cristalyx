import { describe, expect, test } from "vitest";
import { LinearRouter } from "./LinearRouter";

describe("LinearRouter", () => {
  const linearRouter = new LinearRouter<string>(["GET", "POST"]);

  test("should initialize with methods", () => {
    expect(linearRouter.methods).toEqual(["ALL", "GET", "POST"]);
  });

  linearRouter.add("GET", "/", "h-1", "h-2");

  test("should add handlers for GET /", () => {
    const handlers = linearRouter.match("GET", "/");
    expect(handlers).toEqual(["h-1", "h-2"]);
  });

  linearRouter.add("POST", "/test", "h-3");

  test("should add handlers for POST /test", () => {
    const handlers = linearRouter.match("POST", "/test");
    expect(handlers).toEqual(["h-3"]);
  });

  test("should return empty array for unmatched route", () => {
    const handlers = linearRouter.match("GET", "/unmatched");
    expect(handlers).toEqual([]);
  });

  test("should throw when a method is not supported", () => {
    expect(() => linearRouter.match("DELETE", "/")).toThrowError();
  });

  linearRouter.add("POST", "/deeply/nested/path", "h-9");
  linearRouter.add("POST", "/deeply/nested/path/most/deeper", "h-10");

  test("should add deeply nested paths for POST /test", () => {
    const handlers1 = linearRouter.match("POST", "/deeply/nested/path");
    const handlers2 = linearRouter.match("POST", "/deeply/nested/path/most/deeper");
    expect(handlers1).toEqual(["h-9"]);
    expect(handlers2).toEqual(["h-10"]);
  });
});
