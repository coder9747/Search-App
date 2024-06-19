import mongoose from "mongoose";

export const ConnectToDatabase = async (): Promise<any> => {
    try {
        await mongoose.connect("mongodb+srv://pratyushkarn007:gullyislove123@cluster0.gai8t14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database Connected');
        
    } catch (error) {
            console.log('Failed To Connect To Database');
    }

};