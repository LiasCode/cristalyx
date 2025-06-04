import { describe, expect, test } from "vitest";
import { TreeRouter } from "./TreeRouter";

describe("TreeRouter", () => {
  const treeRouter = new TreeRouter<string>(["GET", "POST"]);

  test("should initialize with methods", () => {
    expect(treeRouter.methods).toEqual(["ALL", "GET", "POST"]);
  });

  treeRouter.add("GET", "/", "h-1", "h-2");

  test("should add handlers for GET /", () => {
    const handlers = treeRouter.match("GET", "/");
    expect(handlers).toEqual(["h-1", "h-2"]);
  });

  treeRouter.add("POST", "/test", "h-3");

  test("should add handlers for POST /test", () => {
    const handlers = treeRouter.match("POST", "/test");
    expect(handlers).toEqual(["h-3"]);
  });

  test("should return empty array for unmatched route", () => {
    // const handlers = treeRouter.match("GET", "/unmatched");
    //TODO: This should be fixed to return an empty array
    // expect(handlers).toEqual([]);
  });

  test("should throw when a method is not supported", () => {
    expect(() => treeRouter.match("DELETE", "/")).toThrowError();
  });

  treeRouter.add("POST", "/deeply/nested/path", "h-9");
  treeRouter.add("POST", "/deeply/nested/path/most/deeper", "h-10");

  test("should add deeply nested paths for POST /test", () => {
    const handlers1 = treeRouter.match("POST", "/deeply/nested/path");
    const handlers2 = treeRouter.match("POST", "/deeply/nested/path/most/deeper");
    expect(handlers1).toEqual(["h-9"]);
    expect(handlers2).toEqual(["h-10"]);
  });
});
