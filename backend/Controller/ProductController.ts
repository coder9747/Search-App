import { Request, Response } from "express";
import { ProductModel } from "../Model/ProductModel";
import mongoose from "mongoose";

let productPerPage = 12;

export const SearchData = async (req: Request, res: Response) => {
    try {
        const { query, pageNumber } = req.body;
        const searchCriteria = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } },
            ],
        };
        let skip = (pageNumber - 1) * productPerPage;
        const allData = await ProductModel.find(searchCriteria).skip(skip).limit(productPerPage);
        const dataCount = await ProductModel.countDocuments(searchCriteria);
        res.json({
            succes: true,
            message: "Al Data Fetched",
            data: allData,
            dataCount,
        });


    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            message: "Error On Server",
        })

    }


}

export const getAllData = async (req: Request, res: Response) => {
    try {
        const {pageNumber} = req.body;
        let skip = (pageNumber - 1)*productPerPage;
        const allData = await ProductModel.find({}).skip(skip).limit(productPerPage);
        const dataCount = await ProductModel.countDocuments({});
        res.json({
            succes:true,
            message:`Data Fetched Succesful At Page ${pageNumber}`,
            data:allData,
            dataCount,
        })

    } catch (error) {
        res.json({
            succes:true,
            message:"Server Failed",
        })
    }
}
// export const getAllData = async (req: Request, res: Response) => {
//     try {
//         // Step 1: Retrieve all documents from the ProductModel collection
//         const products = await ProductModel.find().lean(); // .lean() returns plain JavaScript objects

//         if (products.length === 0) {
//             console.log('No products found in the collection.');
//             return;
//         }

//         // Step 2: Modify each document (remove the _id field)
//         const newProducts = products.map((product: any) => {
//             const newProduct = { ...product };
//             delete newProduct._id;
//             return newProduct;
//         });

//         const collection = mongoose.connection.db.collection("products");
//         await collection.insertMany(newProducts);

//         res.json(true);

//     } catch (error: any) {
//         console.log(error.message);
//         res.json({
//             succes: true,
//             message: "Server Failed",
//         })
//     }
// }