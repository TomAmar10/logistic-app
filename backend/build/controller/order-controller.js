"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var order_1 = require("../models/order");
var addOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, savedOrder, populatedOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = req.body;
                newOrder = new order_1.OrderModel(__assign({ _id: new mongoose_1.default.Types.ObjectId(), order_date: new Date(), status: order_1.StatusOrder.PENDING }, order));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, newOrder.save()];
            case 2:
                savedOrder = _a.sent();
                return [4 /*yield*/, order_1.OrderModel.populate(savedOrder, [
                        { path: "items.equipment" },
                        { path: "id_user" },
                    ])];
            case 3:
                populatedOrder = _a.sent();
                return [2 /*return*/, res.status(201).json(populatedOrder)];
            case 4:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_order;
    return __generator(this, function (_a) {
        id_order = req.params.id_order;
        return [2 /*return*/, order_1.OrderModel.findById(id_order)
                .populate([
                { path: "items", populate: { path: "id_category" } },
                { path: "id_user" },
            ])
                .then(function (order) {
                order
                    ? res.status(200).json(order)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, order_1.OrderModel.find()
                .populate([
                { path: "items", populate: { path: "id_category" } },
                { path: "id_user" },
            ])
                .then(function (orders) {
                orders
                    ? res.status(200).json(orders)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getUserOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user;
    return __generator(this, function (_a) {
        id_user = req.params.id_user;
        return [2 /*return*/, order_1.OrderModel.find({ id_user: id_user })
                .populate([
                { path: "items", populate: { path: "id_equipment" } },
                { path: "id_user" },
            ])
                .then(function (orders) {
                orders
                    ? res.status(200).json(orders)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_order;
    return __generator(this, function (_a) {
        id_order = req.params.id_order;
        return [2 /*return*/, order_1.OrderModel.findById(id_order)
                .then(function (order) {
                if (order) {
                    order.set(req.body);
                    return order
                        .save()
                        .then(function (order) { return res.status(201).json(order); })
                        .catch(function (err) { return res.status(500).json(err); });
                }
                else {
                    res.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_order;
    return __generator(this, function (_a) {
        id_order = req.params.id_order;
        return [2 /*return*/, order_1.OrderModel.findByIdAndDelete(id_order)
                .then(function (order) {
                return order
                    ? res.status(201).json({ message: "deleted" })
                    : res.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getOrder: getOrder,
    getAllOrders: getAllOrders,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    getUserOrders: getUserOrders,
};
