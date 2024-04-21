import express from "express";
import controller from "../controller/auth-controller";
import dotenv from "dotenv";
import authMiddleWare from "../middleware/auth-middleware";
dotenv.config();

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.patch("/update/:userId", controller.updateUser);
router.delete("/delete/:userId", controller.deleteUser);
router.get("/refresh-token", authMiddleWare, controller.refreshToken);
router.get("/single/:userId", controller.getUser);
router.get("/all", controller.getAllUsers);

export default router;
