"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticFiles = exports.cristalyx = void 0;
const cristalyx_1 = __importDefault(require("./cristalyx"));
exports.cristalyx = cristalyx_1.default;
const staticMidleware_1 = require("./staticMidleware");
Object.defineProperty(exports, "staticFiles", { enumerable: true, get: function () { return staticMidleware_1.staticFiles; } });
