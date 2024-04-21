import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { EquipmentModel } from "../models/equipment";

const addEquipment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const equipment = request.body;
  const newEquipment = new EquipmentModel({
    _id: new mongoose.Types.ObjectId(),
    ...equipment,
  });
  return newEquipment
    .save()
    .then((equipment) => response.status(201).json(equipment))
    .catch((err) => next(err));
};

const getEquipment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EquipmentId = request.params.equipmentId;
  return EquipmentModel.findById(EquipmentId)
    .populate("id_category")
    .then((equipment) =>
      equipment
        ? response.status(200).json(equipment)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getAllEquipments = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return EquipmentModel.find()
    .populate("id_category")
    .then((equipments) => {
      equipments
        ? response.status(200).json(equipments)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateEquipment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EquipmentId = request.params.equipmentId;
  return EquipmentModel.findById(EquipmentId)
    .then((equipment) => {
      if (equipment) {
        equipment.set(request.body);
        return equipment
          .save()
          .then((equipment) => response.status(201).json(equipment))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteEquipment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EquipmentId = request.params.equipmentId;
  return EquipmentModel.findByIdAndDelete(EquipmentId)
    .then((equipment) =>
      equipment
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getEquipment,
  getAllEquipments,
  addEquipment,
  updateEquipment,
  deleteEquipment,
};
