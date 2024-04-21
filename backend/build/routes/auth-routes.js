"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("../controller/auth-controller"));
var dotenv_1 = __importDefault(require("dotenv"));
var auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
dotenv_1.default.config();
var router = express_1.default.Router();
router.post("/register", auth_controller_1.default.register);
router.post("/login", auth_controller_1.default.login);
router.patch("/update/:userId", auth_controller_1.default.updateUser);
router.delete("/delete/:userId", auth_controller_1.default.deleteUser);
router.get("/refresh-token", auth_middleware_1.default, auth_controller_1.default.refreshToken);
router.get("/single/:userId", auth_controller_1.default.getUser);
router.get("/all", auth_controller_1.default.getAllUsers);
exports.default = router;
