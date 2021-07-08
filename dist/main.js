#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const pjson = __importStar(require("./package.json"));
const OkkyList_1 = require("./lib/OkkyList");
commander_1.program
    .version(`okky-list ${pjson.version}`, '-v, --version')
    .usage('[options]')
    .option('-l, --list [item]', 'add list filter by questions, tech, community, columns, jobs', 'community')
    .option('-n, --number <number>', 'the last [number] lines allowed 1...20', '20')
    .option('-s, --sort [item]', 'order by id, voteCount, noteCount, scrapCount, viewCount', 'id')
    .parse(process.argv);
const optionValues = {
    list: commander_1.program.getOptionValue('list'),
    number: commander_1.program.getOptionValue('number'),
    sort: commander_1.program.getOptionValue('sort')
};
OkkyList_1.okkyList.getList(optionValues).then(result => {
    console.log(result);
    process.exit(0);
});
//# sourceMappingURL=main.js.map