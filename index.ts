import * as http from "http";
require("dotenv").config();
import { connectDatabase } from "./api/models";
import application from "./app";

async function start() {
  await application.setupAppFunctionalities();
  const app = application.getApp();
  const server = http.createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  await connectDatabase();
  await application.initBlobStorage();
}

start();

process.on("unhandledRejection", (reason, p) => {
  console.log(`unhandledRejection------ ${reason}`);
  console.log(`${reason}`);
});
