"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.Role = void 0;
var mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["USER"] = 2] = "USER";
})(Role = exports.Role || (exports.Role = {}));
var UserSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: [true, "Missing name"],
        minLength: [2, "Name too short"],
        maxLength: [20, "Name too long"],
    },
    last_name: {
        type: String,
        required: [true, "Missing last name"],
        minLength: [2, "Last name too short"],
        maxLength: [20, "Last name too long"],
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minLength: [6, "Email too short"],
        maxLength: [50, "Email too long"],
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Missing phone number"],
        minLength: [8, "Phone number too short"],
        maxLength: [12, "Phone number too long"],
        default: "050000000",
    },
    time_create: {
        type: Date,
        required: [true, "Missing creation time"],
        default: new Date(),
    },
    image: {
        type: String,
    },
    role: {
        type: Number,
        required: [true, "Missing role"],
        default: Role.ADMIN,
        min: 1,
        max: 2,
    },
}, {
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)("users", // name of document collection
UserSchema);
