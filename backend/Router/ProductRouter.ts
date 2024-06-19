import express from "express";
import { getAllData, SearchData } from "../Controller/ProductController";


export const ProductRouter = express.Router();


ProductRouter.post('/search',SearchData);
ProductRouter.post("/alldata",getAllData);