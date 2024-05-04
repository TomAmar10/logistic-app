import { Document, model, Schema } from "mongoose";

export enum StatusOrder {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED",
}

export interface IOrder {
  id_user: Schema.Types.ObjectId;
  order_date: Date;
  status: StatusOrder;
  letter: string;
  items: Schema.Types.ObjectId[];
}

export interface IOrderModel extends Document, IOrder {}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing user ID"],
      trim: true,
      ref: "users",
    },
    order_date: {
      type: Date,
      required: [true, "Missing order date"],
      default: new Date(),
    },
    status: {
      type: String,
      required: [false, "Missing status"],
      default: StatusOrder.PENDING,
    },
    letter: {
      type: String,
      required: [false, "Missing letter"],
      maxLength: [200, "Letter is too long"],
    },
    items: [
      {
        equipment: {
          type: Schema.Types.ObjectId,
          required: [true, "Missing equipment ID"],
          trim: true,
          ref: "equipments",
        },
        amount: {
          type: Number,
          required: [true, "Missing item amount"],
          default: 1, // You can set a default amount if needed
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const OrderModel = model<IOrderModel>(
  "orders", // name of document collection
  OrderSchema
);
