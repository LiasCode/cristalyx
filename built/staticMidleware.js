"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticFiles = void 0;
const node_path_1 = __importDefault(require("node:path"));
function staticFiles(route = "") {
    return (req, res) => {
        const { url } = req;
        const plublicFolder = route;
        const urlOfFile = node_path_1.default.join(process.cwd(), plublicFolder, url.split(`/${plublicFolder}`)[1]);
        res.sendFile(urlOfFile);
    };
}
exports.staticFiles = staticFiles;
