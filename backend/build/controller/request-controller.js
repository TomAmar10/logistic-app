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
var request_1 = require("../models/request");
var addRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, newRequest, savedRequest, populatedRequest, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req.body;
                newRequest = new request_1.RequestModel(__assign({ _id: new mongoose_1.default.Types.ObjectId(), request_date: new Date(), status: request_1.StatusRequest.PENDING }, request));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, newRequest.save()];
            case 2:
                savedRequest = _a.sent();
                return [4 /*yield*/, request_1.RequestModel.populate(savedRequest, [
                        { path: "items" },
                        { path: "id_user" },
                    ])];
            case 3:
                populatedRequest = _a.sent();
                return [2 /*return*/, res.status(201).json(populatedRequest)];
            case 4:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_request;
    return __generator(this, function (_a) {
        id_request = req.params.id_request;
        return [2 /*return*/, request_1.RequestModel.findById(id_request)
                .populate([
                { path: "items", populate: { path: "id_category" } },
                { path: "id_user" },
            ])
                .then(function (request) {
                request
                    ? res.status(200).json(request)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllRequests = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request_1.RequestModel.find()
                .populate([
                { path: "items", populate: { path: "id_category" } },
                { path: "id_user" },
            ])
                .then(function (requests) {
                requests
                    ? res.status(200).json(requests)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getUserRequests = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user;
    return __generator(this, function (_a) {
        id_user = req.params.id_user;
        return [2 /*return*/, request_1.RequestModel.find({ id_user: id_user })
                .populate([
                { path: "items", populate: { path: "id_equipment" } },
                { path: "id_user" },
            ])
                .then(function (requests) {
                requests
                    ? res.status(200).json(requests)
                    : res.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_request;
    return __generator(this, function (_a) {
        id_request = req.params.id_request;
        return [2 /*return*/, request_1.RequestModel.findById(id_request)
                .then(function (request) {
                if (request) {
                    request.set(req.body);
                    return request
                        .save()
                        .then(function (request) { return res.status(201).json(request); })
                        .catch(function (err) { return res.status(500).json(err); });
                }
                else {
                    res.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_request;
    return __generator(this, function (_a) {
        id_request = req.params.id_request;
        return [2 /*return*/, request_1.RequestModel.findByIdAndDelete(id_request)
                .then(function (request) {
                return request
                    ? res.status(201).json({ message: "deleted" })
                    : res.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getRequest: getRequest,
    getAllRequests: getAllRequests,
    addRequest: addRequest,
    updateRequest: updateRequest,
    deleteRequest: deleteRequest,
    getUserRequests: getUserRequests,
};
