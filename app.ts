import express from "express";
import * as SwaggerExpress from "swagger-express-mw";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import * as YAML from "yamljs";
import azureBlobStorage from "./api/utils/azureBlobStorage";

const swaggerDocument = YAML.load("./api/swagger/swagger.yaml");

const options = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
};

class Application {
  private app: express.Application;

  constructor() {
    this.app = express();
    console.log("Initialized Application basic configuration.");
  }

  getApp() {
    return this.app;
  }

  async setupAppFunctionalities() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, options)
    );

    this.app.use(bodyParser.json());

    await new Promise<void>((resolve, reject) => {
      SwaggerExpress.create(
        { appRoot: `${__dirname}` },
        (err, swaggerExpress) => {
          if (err) {
            console.log("Error occurred while intializing swagger.");
            console.log(err);
            reject();
          } else {
            swaggerExpress.register(this.app);
            resolve();
          }
        }
      );
    });
  }

  /**
   * To initialize blob storage on our express app
   */
  public async initBlobStorage() {
    try {
      const account = await azureBlobStorage.accountInfo();
      console.log(
        `AzureBlobStorage version: ${account.version} connection successful!`
      );
      const container = await azureBlobStorage.createContainer();
      if (container.succeeded) {
        console.log(
          `Container: ${process.env.AZURE_BLOB_STORAGE_CONTAINER} created successfully!\n`
        );
      } else if (
        container.succeeded === false &&
        container.errorCode === "ContainerAlreadyExists"
      ) {
        console.log(
          `Using existing container: ${process.env.AZURE_BLOB_STORAGE_CONTAINER}\n`
        );
      }
    } catch (err) {
      console.error("Aborting.....");
    }
  }
}

export default new Application();
