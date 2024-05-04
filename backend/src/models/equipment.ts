import { Document, model, Schema } from "mongoose";

export interface IEquipment {
  name: string;
  id_category: Schema.Types.ObjectId;
  description: string;
  total_qty: number;
  image: Buffer | string;
  amount?: number;
}

export interface IEquipmentModel extends Document, IEquipment {}

const EquipmentSchema: Schema = new Schema<IEquipment>(
  {
    name: {
      type: String,
      required: [true, "Missing event name"],
      minLength: [2, "Equipment name too short"],
      maxLength: [40, "Equipment name too long"],
    },
    id_category: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing category ID"],
      trim: true,
      ref: "categories",
    },
    description: {
      type: String,
      required: [true, "Missing description"],
      minLength: [2, "Description too short"],
      maxLength: [70, "Description too long"],
    },
    total_qty: {
      type: Number,
      required: [true, "Missing quantity"],
      min: [0, "Quantiti must be greater than 0"],
      default: 0,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const EquipmentModel = model<IEquipmentModel>(
  "equipments", // name of document collection
  EquipmentSchema
);
