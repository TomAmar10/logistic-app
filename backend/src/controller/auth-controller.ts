import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user";
import dotenv from "dotenv";
import ErrorModel from "../models/error";
import jwtHelper from "../utils/jwt-helper";
import sendEmail, { createEmailContent } from "../utils/sendEmail";
dotenv.config();

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body;
  const newUser = new UserModel(
    await {
      _id: new mongoose.Types.ObjectId(),
      time_create: new Date(),
      ...user,
    }
  );
  return newUser
    .save()
    .then((user) => {
      const { image, ...userToToken } = user.toObject();
      const token = jwtHelper.generateToken(userToToken);
      const refreshToken = jwtHelper.generateRefreshToken(userToToken);
      response.set({ authorization: token, refreshToken });
      response.status(201).json({ image });
    })
    .catch((err) => next(err));
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userDetails = request.body;
  return UserModel.findOne({ email: userDetails.email })
    .then(async (user) => {
      if (!user) throw new ErrorModel(401, "wrong details !");
      const { image, ...userToToken } = user.toObject();
      const token = jwtHelper.generateToken(userToToken);
      const refreshToken = jwtHelper.generateRefreshToken(userToToken);
      response.set({ authorization: token, refreshToken });
      response.status(200).json({ image });
    })
    .catch((err) => next(err));
};

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  const userDetails = request.body;
  return UserModel.findById(userId)
    .then(async (user) => {
      if (user) {
        if (!userDetails.image) userDetails.image = "";
        user.set(userDetails);
        return user
          .save()
          .then((user) => {
            const { image, ...userToToken } = user.toObject();
            const token = jwtHelper.generateToken(userToToken);
            const refreshToken = jwtHelper.generateRefreshToken(userToToken);
            response.set({ authorization: token, refreshToken });
            response.status(201).json({ image });
          })
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "Something went wrong" });
      }
    })
    .catch((err) => next(err));
};

const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return UserModel.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const refreshToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = request.headers.authorization;
    const user = jwtHelper.getUserFromToken(refreshToken);
    console.log("USER : " + user);
    const { image, ...userToToken } = user;
    const token = await jwtHelper.generateToken(userToToken);
    response.set({ authorization: token });
    response.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return UserModel.findById(userId)
    .then((user) => {
      const { image, ...userObject } = user.toObject();
      if (user) response.status(200).json(userObject);
      else throw new ErrorModel(401, "user not found");
    })
    .catch((err) => next(err));
};

const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return UserModel.find()
    .then((users) => {
      if (!users) throw new ErrorModel(401, "No users to show");
      response.status(200).json(users);
    })
    .catch((err) => next(err));
};

export default {
  register,
  login,
  updateUser,
  deleteUser,
  refreshToken,
  getUser,
  getAllUsers,
};
