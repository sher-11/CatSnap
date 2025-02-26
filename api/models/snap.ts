import mongoose, { Schema, Model, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
// import { IMongoModel } from '../types/models';
uuidv4();

interface ISnaps {
  _id?: Types.ObjectId;
  imageId?: String;
  imageName?: String;
  username: String;
  email: String;
  updateDate?: Date;
}

const snapSchema = new Schema<ISnaps>({
  imageId: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
    // required: true,
  },
  imageName: {
    type: String,
    // required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = snapSchema;
