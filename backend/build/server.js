"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var error_1 = __importDefault(require("./models/error"));
var catch_all_1 = __importDefault(require("./middleware/catch-all"));
var auth_routes_1 = __importDefault(require("./routes/auth-routes"));
var equipment_routes_1 = __importDefault(require("./routes/equipment-routes"));
var category_routes_1 = __importDefault(require("./routes/category-routes"));
var order_routes_1 = __importDefault(require("./routes/order-routes"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./utils/config");
var body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(function () {
    console.log("connected");
})
    .catch(function (err) { return console.log(err); });
var server = (0, express_1.default)();
var clientOrigin = process.env.MODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.CLIENT_SIDE_URL;
server.use((0, cors_1.default)({
    origin: [clientOrigin],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "refreshToken"],
    exposedHeaders: ["Authorization", "refreshToken"],
    credentials: true,
}));
server.use(body_parser_1.default.json({ limit: "5mb" }));
server.use(body_parser_1.default.urlencoded({
    limit: "10mb",
    extended: false,
}));
server.use(express_1.default.json());
server.use("/api/auth", auth_routes_1.default);
server.use("/api/equipments", equipment_routes_1.default);
server.use("/api/categories", category_routes_1.default);
server.use("/api/orders", order_routes_1.default);
server.use("*", function (Request, response, next) {
    next(new error_1.default(404, "route not found!"));
});
server.use(catch_all_1.default);
server.listen(process.env.PORT, function () {
    console.log("listening on port " + process.env.PORT);
    console.log(clientOrigin);
});
