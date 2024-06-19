import express from "express";
import cors from "cors";
import { ConnectToDatabase } from "./Database/db";
import { ProductRouter } from "./Router/ProductRouter";


const app = express();



//middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/product",ProductRouter);



app.listen(4500,()=>
{
    ConnectToDatabase();
    console.log('server running At port 4500');
})