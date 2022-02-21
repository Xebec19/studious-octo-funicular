"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../environment");
var decodeToken = function (req, res, next) {
    var _a;
    var response;
    try {
        var token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        var decoded = jsonwebtoken_1.default.verify("".concat(token), "".concat(environment_1.jwtSecret), function (err, decoded) {
            if (err) {
                throw new Error(err.message);
            }
            console.log(decoded); // bar
            next();
        });
    }
    catch (error) {
        console.log(error.message);
        response = {
            message: error.message,
            status: false,
        };
        res.status(401).json({ message: error.message }).end();
        return;
    }
};
exports.decodeToken = decodeToken;
