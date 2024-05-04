import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { OrderModel, StatusOrder } from "../models/order";

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body;
  const newOrder = new OrderModel({
    _id: new mongoose.Types.ObjectId(),
    order_date: new Date(),
    status: StatusOrder.PENDING,
    ...order,
  });

  try {
    const savedOrder = await newOrder.save();
    const populatedOrder = await OrderModel.populate(savedOrder, [
      { path: "items.equipment" },
      { path: "id_user" },
    ]);
    return res.status(201).json(populatedOrder);
  } catch (err) {
    return next(err);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id_order = req.params.id_order;
  return OrderModel.findById(id_order)
    .populate([
      { path: "items", populate: { path: "id_category" } },
      { path: "id_user" },
    ])
    .then((order: any) => {
      order
        ? res.status(200).json(order)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return OrderModel.find()
    .populate([
      { path: "items", populate: { path: "id_category" } },
      { path: "id_user" },
    ])
    .then((orders) => {
      orders
        ? res.status(200).json(orders)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_user = req.params.id_user;
  return OrderModel.find({ id_user })
    .populate([
      { path: "items", populate: { path: "id_equipment" } },
      { path: "id_user" },
    ])
    .then((orders) => {
      orders
        ? res.status(200).json(orders)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id_order = req.params.id_order;

  return OrderModel.findById(id_order)
    .then((order) => {
      if (order) {
        order.set(req.body);
        return order
          .save()
          .then((order) => res.status(201).json(order))
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id_order = req.params.id_order;
  return OrderModel.findByIdAndDelete(id_order)
    .then((order) =>
      order
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getOrder,
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
};
