"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var decodeToken_1 = require("./libs/decodeToken");
var updateLastAccess_1 = require("./utils/updateLastAccess");
var misl_1 = require("./controllers/misl");
var app = (0, express_1.default)();
var argv = (0, minimist_1.default)(process.argv.slice(2)).seed || false;
console.log('--seeding enabled : ', argv);
if (argv) {
    (0, misl_1.seedingFunc)();
}
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/public", require("./routes/public"));
app.use("/cart", decodeToken_1.decodeToken, updateLastAccess_1.updateLastAccess, require("./routes/cart"));
app.use("/order", decodeToken_1.decodeToken, updateLastAccess_1.updateLastAccess, require("./routes/order"));
exports.default = app;
