"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = exports.StatusRequest = void 0;
var mongoose_1 = require("mongoose");
var StatusRequest;
(function (StatusRequest) {
    StatusRequest["PENDING"] = "PENDING";
    StatusRequest["CONFIRMED"] = "CONFIRMED";
    StatusRequest["DECLINED"] = "DECLINED";
})(StatusRequest = exports.StatusRequest || (exports.StatusRequest = {}));
var RequestSchema = new mongoose_1.Schema({
    id_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing user ID"],
        trim: true,
        ref: "users",
    },
    request_date: {
        type: Date,
        required: [true, "Missing bid date"],
        default: new Date(),
    },
    status: {
        type: String,
        required: [false, "Missing status"],
        default: StatusRequest.PENDING,
    },
    items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, "Missing equipment ID"],
            trim: true,
            ref: "equipments",
        },
    ],
}, {
    versionKey: false,
});
exports.RequestModel = (0, mongoose_1.model)("requests", // name of document collection
RequestSchema);
