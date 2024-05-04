import express from "express";
import controller from "../controller/order-controller";

const router = express.Router();

router.get("/single/:id_order", controller.getOrder);
router.get("/all", controller.getAllOrders);
router.get("/all/by_user/:id_user", controller.getUserOrders);
router.post("/add", controller.addOrder);
router.patch("/update/:id_order", controller.updateOrder);
router.delete("/delete/:id_order", controller.deleteOrder);

export default router;
