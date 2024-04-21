import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { RequestModel, StatusRequest } from "../models/request";

const addRequest = async (req: Request, res: Response, next: NextFunction) => {
  const request = req.body;
  const newRequest = new RequestModel({
    _id: new mongoose.Types.ObjectId(),
    request_date: new Date(),
    status: StatusRequest.PENDING,
    ...request,
  });

  try {
    const savedRequest = await newRequest.save();
    const populatedRequest = await RequestModel.populate(savedRequest, [
      { path: "items" },
      { path: "id_user" },
    ]);
    return res.status(201).json(populatedRequest);
  } catch (err) {
    return next(err);
  }
};

const getRequest = async (req: Request, res: Response, next: NextFunction) => {
  const id_request = req.params.id_request;
  return RequestModel.findById(id_request)
    .populate([
      { path: "items", populate: { path: "id_category" } },
      { path: "id_user" },
    ])
    .then((request: any) => {
      request
        ? res.status(200).json(request)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return RequestModel.find()
    .populate([
      { path: "items", populate: { path: "id_category" } },
      { path: "id_user" },
    ])
    .then((requests) => {
      requests
        ? res.status(200).json(requests)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_user = req.params.id_user;
  return RequestModel.find({ id_user })
    .populate([
      { path: "items", populate: { path: "id_equipment" } },
      { path: "id_user" },
    ])
    .then((requests) => {
      requests
        ? res.status(200).json(requests)
        : res.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_request = req.params.id_request;

  return RequestModel.findById(id_request)
    .then((request) => {
      if (request) {
        request.set(req.body);
        return request
          .save()
          .then((request) => res.status(201).json(request))
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_request = req.params.id_request;
  return RequestModel.findByIdAndDelete(id_request)
    .then((request) =>
      request
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getRequest,
  getAllRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  getUserRequests,
};
