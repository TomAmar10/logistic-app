"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var equipment_controller_1 = __importDefault(require("../controller/equipment-controller"));
var router = express_1.default.Router();
router.get("/single/:equipmentId", equipment_controller_1.default.getEquipment);
router.get("/all", equipment_controller_1.default.getAllEquipments);
router.post("/add", equipment_controller_1.default.addEquipment);
router.patch("/update/:equipmentId", equipment_controller_1.default.updateEquipment);
router.delete("/delete/:equipmentId", equipment_controller_1.default.deleteEquipment);
exports.default = router;
