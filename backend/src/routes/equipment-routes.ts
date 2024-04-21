import express from "express";
import controller from "../controller/equipment-controller";

const router = express.Router();

router.get("/single/:equipmentId", controller.getEquipment);
router.get("/all", controller.getAllEquipments);
router.post("/add", controller.addEquipment);
router.patch("/update/:equipmentId", controller.updateEquipment);
router.delete("/delete/:equipmentId", controller.deleteEquipment);

export default router;
