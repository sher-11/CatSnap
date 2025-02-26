import { v4 as uuidv4 } from "uuid";
import snapservice from "../services/snap";
uuidv4();
import blobStorage from "../utils/azureBlobStorage";

export const uploadSnaps = async (req: any, response: any, next: any) => {
  try {
    console.log("Received request in uploadSnaps in snap controller. ");
    let body = req.swagger.params.image;

    const data = blobStorage.uploadFiles(body);
    console.log(data);

    let subData: any = {
      username: "shreya",
      email: "shreyachandradev@gmail.com",
    };

    const responseData = await snapservice.uploadSnaps(subData);

    return response.status(201).send("xyz");
  } catch (error) {
    console.log("Error in uploadSnaps controller.");
    next(error);
  }
};

export const deleteSnaps = async (request: any, response: any, next: any) => {
  try {
    console.log("Received request in deleteSnaps in snap controller.");

    let body = request.swagger.params.body.value;

    const responseData = await snapservice.deleteSnaps(body);

    return response.status(201).send(responseData);
  } catch (error) {
    console.log("Error in deleteSnaps controller.");
    next(error);
  }
};

export const getSnapsById = async (request: any, response: any, next: any) => {
  try {
    console.log("Received request in deleteSnaps in snap controller.");

    let body = request.swagger.params.imageId.value;

    const responseData = await snapservice.getSnapsById(body);

    return response.status(201).send(responseData);
  } catch (error) {
    console.log("Error in getSnapsById controller.");
    next(error);
  }
};

export const listSnaps = async (request: any, response: any, next: any) => {
  try {
    console.log("Received request in listSnaps in snap controller.");

    let body = request.swagger.params.body.value;

    const responseData = await snapservice.deleteSnaps(body);

    return response.status(200).send(responseData);
  } catch (error) {
    console.log("Error in ListSnap controller.");
    next(error);
  }
};
