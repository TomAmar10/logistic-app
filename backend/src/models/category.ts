import { Document, model, Schema } from "mongoose";

export interface ICategory {
  name: String;
}

export interface ICategoryModel extends Document, ICategory {}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Missing category name"],
      minLength: [2, "Category name too short"],
      maxLength: [20, "Category name too long"],
    },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = model<ICategoryModel>(
  "categories", // name of document collection
  CategorySchema
);
