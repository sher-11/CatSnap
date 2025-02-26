import db, { dbConnection } from "../models";
// import { BlobServiceClient } from '@azure/storage-blob';
// import azureBlobStorage from "../utils/azureBlobStorage";

import ISnaps from "../models";

class CatSnap {
  public static instance: CatSnap;
  private constructor() {}
  public static getInstance() {
    if (!CatSnap.instance) {
      CatSnap.instance = new CatSnap();
    }

    return CatSnap.instance;
  }

  public async uploadSnaps(requestBody: any) {
    console.log("Received request in uploadSnaps in snap service.");
    const body = JSON.parse(JSON.stringify(requestBody));
    const fetchedData = {
      imageUrl: body.imageUrl,
      imageId: body.imageId,
      username: body.username,
      email: body.email,
    };

    const data = await dbConnection.create(fetchedData);

    return data;
  }

  public async deleteSnaps(requestBody: any) {
    console.log("Received request in uploadSnaps in snap service.");

    let deletedImageId = requestBody.imageId;

    const data = await dbConnection.delete({
      where: deletedImageId,
    });

    return data;
  }

  public async listSnaps() {
    console.log("Received request in lisSnaps in snap service.");

    const data = await dbConnection.find();

    return data;
  }

  public async getSnapsById(requestBody: any) {
    console.log("Received request in lisSnaps in snap service.");

    const data = await dbConnection.findOne({
      where: requestBody.imageId,
    });

    return data;
  }
}

export default CatSnap.getInstance();
