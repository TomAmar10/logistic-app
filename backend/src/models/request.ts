import { Document, model, Schema } from "mongoose";

export enum StatusRequest {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED",
}

export interface IRequest {
  id_user: Schema.Types.ObjectId;
  request_date: Date;
  status: StatusRequest;
  items: Schema.Types.ObjectId[];
}

export interface IRequestModel extends Document, IRequest {}

const RequestSchema: Schema = new Schema<IRequest>(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing user ID"],
      trim: true,
      ref: "users",
    },
    request_date: {
      type: Date,
      required: [true, "Missing bid date"],
      default: new Date(),
    },
    status: {
      type: String,
      required: [false, "Missing status"],
      default: StatusRequest.PENDING,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Missing equipment ID"],
        trim: true,
        ref: "equipments",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const RequestModel = model<IRequestModel>(
  "requests", // name of document collection
  RequestSchema
);

