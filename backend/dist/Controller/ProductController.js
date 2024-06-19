"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = exports.SearchData = void 0;
const ProductModel_1 = require("../Model/ProductModel");
let productPerPage = 12;
const SearchData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const allData = yield ProductModel_1.ProductModel.find(searchCriteria).skip(skip).limit(productPerPage);
        const dataCount = yield ProductModel_1.ProductModel.countDocuments(searchCriteria);
        res.json({
            succes: true,
            message: "Al Data Fetched",
            data: allData,
            dataCount,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            succes: false,
            message: "Error On Server",
        });
    }
});
exports.SearchData = SearchData;
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNumber } = req.body;
        let skip = (pageNumber - 1) * productPerPage;
        const allData = yield ProductModel_1.ProductModel.find({}).skip(skip).limit(productPerPage);
        const dataCount = yield ProductModel_1.ProductModel.countDocuments({});
        res.json({
            succes: true,
            message: `Data Fetched Succesful At Page ${pageNumber}`,
            data: allData,
            dataCount,
        });
    }
    catch (error) {
        res.json({
            succes: true,
            message: "Server Failed",
        });
    }
});
exports.getAllData = getAllData;
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
