"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../Controller/ProductController");
exports.ProductRouter = express_1.default.Router();
exports.ProductRouter.post('/search', ProductController_1.SearchData);
exports.ProductRouter.post("/alldata", ProductController_1.getAllData);
