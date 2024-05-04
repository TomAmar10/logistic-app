"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_controller_1 = __importDefault(require("../controller/order-controller"));
var router = express_1.default.Router();
router.get("/single/:id_order", order_controller_1.default.getOrder);
router.get("/all", order_controller_1.default.getAllOrders);
router.get("/all/by_user/:id_user", order_controller_1.default.getUserOrders);
router.post("/add", order_controller_1.default.addOrder);
router.patch("/update/:id_order", order_controller_1.default.updateOrder);
router.delete("/delete/:id_order", order_controller_1.default.deleteOrder);
exports.default = router;
