"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var request_controller_1 = __importDefault(require("../controller/request-controller"));
var router = express_1.default.Router();
router.get("/single/:id_request", request_controller_1.default.getRequest);
router.get("/all", request_controller_1.default.getAllRequests);
router.get("/all/by_user/:id_user", request_controller_1.default.getUserRequests);
router.post("/add", request_controller_1.default.addRequest);
router.patch("/update/:id_request", request_controller_1.default.updateRequest);
router.delete("/delete/:id_request", request_controller_1.default.deleteRequest);
exports.default = router;
