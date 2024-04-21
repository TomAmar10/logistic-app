import { Document, model, Schema } from "mongoose";

export enum Role {
  ADMIN = 1,
  USER = 2,
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  personal_number: string;
  time_create: Date;
  image: Buffer | string;
  role: Role;
}

export interface IUserModel extends Document, IUser {}

const UserSchema: Schema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, "Missing name"],
      minLength: [2, "Name too short"],
      maxLength: [20, "Name too long"],
    },
    last_name: {
      type: String,
      required: [true, "Missing last name"],
      minLength: [2, "Last name too short"],
      maxLength: [20, "Last name too long"],
    },
    email: {
      type: String,
      required: [true, "Missing email"],
      minLength: [6, "Email too short"],
      maxLength: [50, "Email too long"],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Missing phone number"],
      minLength: [8, "Phone number too short"],
      maxLength: [12, "Phone number too long"],
      default: "050000000",
    },
    personal_number: {
      type: String,
      required: [true, "Missing personal number"],
      minLength: [6, "Personal number too short"],
      maxLength: [9, "Personal number too long"],
    },
    time_create: {
      type: Date,
      required: [true, "Missing creation time"],
      default: new Date(),
    },
    image: {
      type: String,
    },
    role: {
      type: Number,
      required: [true, "Missing role"],
      default: Role.ADMIN, // NEED TO BE CHANGED !!
      min: 1,
      max: 2,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model<IUserModel>(
  "users", // name of document collection
  UserSchema
);
