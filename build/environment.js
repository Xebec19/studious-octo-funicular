"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorKey = exports.razorSecret = exports.jwtSecret = exports.dbPassword = exports.dbPort = exports.dbDatabase = exports.dbHost = exports.dbUser = void 0;
var de = __importStar(require("dotenv"));
var dotenv = de.config();
if (dotenv.error) {
    console.error("Error occurred while setting dot env files : ", dotenv.error);
}
exports.dbUser = process.env.DB_USER;
exports.dbHost = process.env.DB_HOST;
exports.dbDatabase = process.env.DB_DATABASE;
exports.dbPort = process.env.DB_PORT;
exports.dbPassword = process.env.DB_PASSWORD;
exports.jwtSecret = process.env.JWT_SECRET;
exports.razorSecret = process.env.RAZORPAY_SECRET;
exports.razorKey = process.env.RAZORPAY_KEY;
