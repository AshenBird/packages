"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/cli/src/Command.ts
var Command_exports = {};
__export(Command_exports, {
  Command: () => Command
});
module.exports = __toCommonJS(Command_exports);
var Command = class {
  name = "";
  handle;
  schema;
  constructor(options) {
    const { handle, schema, name } = options;
    this.handle = handle;
    this.schema = schema;
    this.name = name;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Command
});
