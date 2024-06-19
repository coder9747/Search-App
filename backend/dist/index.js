"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./Database/db");
const ProductRouter_1 = require("./Router/ProductRouter");
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/product", ProductRouter_1.ProductRouter);
app.listen(4500, () => {
    (0, db_1.ConnectToDatabase)();
    console.log('server running At port 4500');
});
