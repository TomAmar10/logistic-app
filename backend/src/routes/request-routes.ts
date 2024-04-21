import express from "express";
import controller from "../controller/request-controller";

const router = express.Router();

router.get("/single/:id_request", controller.getRequest);
router.get("/all", controller.getAllRequests);
router.get("/all/by_user/:id_user", controller.getUserRequests);
router.post("/add", controller.addRequest);
router.patch("/update/:id_request", controller.updateRequest);
router.delete("/delete/:id_request", controller.deleteRequest);

export default router;
