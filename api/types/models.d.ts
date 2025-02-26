import { Model } from 'mongoose';
declare global {
    interface IDbConnection {
        Snap: any;
    }
}

declare interface ISnaps {
  _id?: Types.ObjectId;
  imageId: String,
  imageUrl: String,
  username: String,
  email: String,
  updateDate?: Date,
  }

interface IMongoModel {
    modelInstance: Model<any>;
    modelName: keyof ISnaps;
  }

  