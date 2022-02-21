"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var razorpay_1 = __importDefault(require("razorpay"));
var instance = new razorpay_1.default({
    key_id: environment_1.razorKey,
    key_secret: environment_1.razorSecret,
});
exports.default = instance;
