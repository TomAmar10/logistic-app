"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.StatusOrder = void 0;
var mongoose_1 = require("mongoose");
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["PENDING"] = "PENDING";
    StatusOrder["CONFIRMED"] = "CONFIRMED";
    StatusOrder["DECLINED"] = "DECLINED";
})(StatusOrder = exports.StatusOrder || (exports.StatusOrder = {}));
var OrderSchema = new mongoose_1.Schema({
    id_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing user ID"],
        trim: true,
        ref: "users",
    },
    order_date: {
        type: Date,
        required: [true, "Missing order date"],
        default: new Date(),
    },
    status: {
        type: String,
        required: [false, "Missing status"],
        default: StatusOrder.PENDING,
    },
    letter: {
        type: String,
        required: [false, "Missing letter"],
        maxLength: [200, "Letter is too long"],
    },
    items: [
        {
            equipment: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: [true, "Missing equipment ID"],
                trim: true,
                ref: "equipments",
            },
            amount: {
                type: Number,
                required: [true, "Missing item amount"],
                default: 1, // You can set a default amount if needed
            },
        },
    ],
}, {
    versionKey: false,
});
exports.OrderModel = (0, mongoose_1.model)("orders", // name of document collection
OrderSchema);
