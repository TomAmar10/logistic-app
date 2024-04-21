import { Document, model, Schema } from "mongoose";

export interface IEquipment {
  name: string;
  id_category: Schema.Types.ObjectId;
  description: string;
  image: Buffer | string;
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
