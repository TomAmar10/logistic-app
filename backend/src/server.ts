import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./models/error";
import catchAll from "./middleware/catch-all";
import AuthRouter from "./routes/auth-routes";
import EventRouter from "./routes/equipment-routes";
import CategoryRouter from "./routes/category-routes";
import BidRouter from "./routes/request-routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./utils/config";
import bodyParser from "body-parser";

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const server = express();
const clientOrigin =
  process.env.MODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.CLIENT_SIDE_URL;
server.use(
  cors({
    origin: [clientOrigin],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "refreshToken"],
    exposedHeaders: ["Authorization", "refreshToken"],
    credentials: true,
  })
);

server.use(bodyParser.json({ limit: "5mb" }));
server.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false,
  })
);

server.use(express.json());

server.use("/api/auth", AuthRouter);
server.use("/api/equipments", EventRouter);
server.use("/api/categories", CategoryRouter);
server.use("/api/requests", BidRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);

server.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  console.log(clientOrigin);
});
