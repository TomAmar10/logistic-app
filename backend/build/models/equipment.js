"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModel = void 0;
var mongoose_1 = require("mongoose");
var EquipmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing event name"],
        minLength: [2, "Equipment name too short"],
        maxLength: [40, "Equipment name too long"],
    },
    id_category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing category ID"],
        trim: true,
        ref: "categories",
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minLength: [2, "Description too short"],
        maxLength: [70, "Description too long"],
    },
    total_qty: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [0, "Quantiti must be greater than 0"],
        default: 0,
    },
    image: {
        type: String,
    },
}, {
    versionKey: false,
});
exports.EquipmentModel = (0, mongoose_1.model)("equipments", // name of document collection
EquipmentSchema);
