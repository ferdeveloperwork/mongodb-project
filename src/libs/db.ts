import { EnvironmentConfig, loadEnvironmentConfig } from "@libs/config";
import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDataBase() {
    if (isConnected) {
        return;
    }

    const config: EnvironmentConfig = loadEnvironmentConfig();

    try {
        await mongoose.connect(`${config.MONGODB_URI}`, {} as mongoose.ConnectOptions);
        isConnected = true;
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log("Error Connecting to MongoDB", error);
        throw new Error("Could not connect to the database");
    };
}