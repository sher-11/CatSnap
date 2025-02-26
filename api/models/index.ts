import mongoose, { createConnection } from "mongoose";
require("dotenv").config();
import * as path from "path";
import * as fs from "fs";
import Snap from "../types/models";
// import SnapInfos from './snap';
const db = {} as IDbConnection;
let dbConnection: any;

const initializeMongo = async () => {
  try {
    const codecademyDbInstance: mongoose.Connection = await createConnection(
      process.env.MONGO_URI!,
      {
        bufferCommands: false,
        autoCreate: false,
        dbName: process.env.DB_NAME,
        serverSelectionTimeoutMS: 43200000,
      }
    );

    codecademyDbInstance.on("connected", () =>
      console.log("Connected to MongoDb Database")
    );
    codecademyDbInstance.on("open", () =>
      console.log("Opened mongoDB database")
    );
    codecademyDbInstance.on("disconnected", () => 
    console.log("disconnected")
    );
    codecademyDbInstance.on("reconnected", () => 
    console.log("reconnected")
    );
    codecademyDbInstance.on("disconnecting", () =>
      console.log("disconnecting")
    );

    codecademyDbInstance.on("disconnected", function () {
      console.log("Mongoose default connection is disconnected");
    });

    (dbConnection = codecademyDbInstance.model(
      "Snap",
      require("../models/snap")
    )),
      { strict: true };

    console.log(codecademyDbInstance.models["Snap"]);
  } catch (err) {
    console.log("Encountered an error while connecting to mongodb");
  }
};

async function connectDatabase() {
  await initializeMongo();
  console.log("Initialized database.");
}

async function disconnect() {
  await mongoose.disconnect();
}

export default db;
export { dbConnection };
export { initializeMongo };
export { connectDatabase, disconnect };
