import * as fs from "fs";
import * as path from "path";
import { BlobServiceClient } from "@azure/storage-blob";

class AzureBlobStorage {
  private static instance: AzureBlobStorage;
  private readonly blobServiceClient: BlobServiceClient;

  private constructor() {
    try {
      if (process.env.AZURE_BLOB_CONNECTION_STRING) {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(
          process.env.AZURE_BLOB_CONNECTION_STRING
        );
      } else {
        throw new Error("Azure Blob Storage ENV missing.");
      }
    } catch (err: any) {
      console.log(err.message, "\nAborting...");
      process.exit(9);
    }
  }

  public static getInstance() {
    if (!AzureBlobStorage.instance) {
      AzureBlobStorage.instance = new AzureBlobStorage();
    }

    return AzureBlobStorage.instance;
  }

  get getClient() {
    return this.blobServiceClient;
  }

  accountInfo() {
    return this.blobServiceClient.getAccountInfo();
  }

  createContainer() {
    const containerClient = this.blobServiceClient.getContainerClient(
      process.env.AZURE_BLOB_STORAGE_CONTAINER!
    );

    return containerClient.createIfNotExists();
  }

  createContainerIfNotExists(containerName: string) {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    return containerClient.createIfNotExists();
  }

  async uploadFiles(imageUrl: string) {
    const containerClient = this.blobServiceClient.getContainerClient(
      process.env.AZURE_BLOB_STORAGE_CONTAINER!
    );
    const blockBlobClient = containerClient.getBlockBlobClient(
      process.env.AZURE_BLOB_STORAGE_CONTAINER!
    );
    const uploadBlobResponse = await blockBlobClient.uploadFile(`${imageUrl}`);
    return `files uploaded successfully to Azure storage!`;
  }
}

export default AzureBlobStorage.getInstance();
