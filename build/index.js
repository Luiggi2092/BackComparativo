"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./api/app"));
//import prueba from "./api/db";
const db_1 = require("./api/db");
(0, db_1.getConnection)();
const port = 3000;
app_1.default.listen(port, () => {
    console.log("%s listening at 300");
});
