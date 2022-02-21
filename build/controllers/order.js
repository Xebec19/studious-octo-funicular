"use strict";
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
        while (_) try {
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
exports.createOrder = exports.checkout = void 0;
var executeSql_1 = require("../utils/executeSql");
var getUserFromToken_1 = require("../utils/getUserFromToken");
var calcTotal_1 = require("../utils/calcTotal");
var async_1 = require("nanoid/async");
var razorInstance_1 = __importDefault(require("../libs/razorInstance"));
var crypto_1 = __importDefault(require("crypto"));
var environment_1 = require("../environment");
/**
 * @type POST
 * @access PRIVATE
 * @route /order/checkout
 */
var checkout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, razorpay_order_id, razorpay_signature, razorpay_payment_id, email, address, body, signature, token, userId, cartId_1, orderId_1, cartSummary, orderDetails_1, cartItems_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, razorpay_order_id = _a.razorpay_order_id, razorpay_signature = _a.razorpay_signature, razorpay_payment_id = _a.razorpay_payment_id, email = _a.email, address = _a.address;
                if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !address)
                    throw new Error("Invalid arguments");
                body = razorpay_order_id + "|" + razorpay_payment_id;
                signature = crypto_1.default
                    .createHmac("sha256", "".concat(environment_1.razorSecret))
                    .update(body.toString())
                    .digest("hex");
                if (signature !== razorpay_signature)
                    throw new Error("Signature did'nt match");
                token = req.headers["authorization"];
                return [4 /*yield*/, (0, getUserFromToken_1.findUserByToken)(token)];
            case 1:
                userId = _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n      SELECT CART_ID\n      FROM PUBLIC.BAZAAR_CARTS BC\n      LEFT JOIN BAZAAR_USERS BU ON BU.USER_ID = BC.USER_ID\n      WHERE BU.USER_ID =\n\t\t  $1\n      ", [userId])];
            case 2:
                cartId_1 = _b.sent();
                return [4 /*yield*/, (0, async_1.nanoid)(15)];
            case 3: return [4 /*yield*/, (_b.sent()).toUpperCase()];
            case 4:
                orderId_1 = _b.sent();
                return [4 /*yield*/, (0, calcTotal_1.calcTotal)(cartId_1.rows[0].cart_id)];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    SELECT cart_id, user_id, price, delivery_price,total\n\t  FROM public.bazaar_carts WHERE cart_Id = $1;\n    ", [cartId_1.rows[0].cart_id])];
            case 6:
                cartSummary = _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    INSERT INTO public.bazaar_order(\n      order_id, user_id, price, delivery_price, total, email, address)\n      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id;\n    ", [
                        orderId_1 + '',
                        userId,
                        +cartSummary.rows[0].price,
                        +cartSummary.rows[0].delivery_price,
                        +cartSummary.rows[0].total,
                        email,
                        address
                    ])];
            case 7:
                orderDetails_1 = _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("SELECT cd_id, cart_id, product_id, product_price, quantity, delivery_price\n        FROM public.bazaar_cart_details WHERE cart_id = $1;", [cartId_1.rows[0].cart_id])];
            case 8:
                cartItems_1 = _b.sent();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Promise.all(cartItems_1.rows.map(function (value, index) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, executeSql_1.executeSql)("\n          INSERT INTO public.bazaar_order_details(\n            order_id, product_id, product_price, quantity, delivery_price)\n            VALUES ($1, $2, $3, $4, $5);\n          ", [
                                                    orderDetails_1.rows[0].order_id + '',
                                                    cartItems_1.rows[index].product_id,
                                                    +cartItems_1.rows[index].product_price,
                                                    cartItems_1.rows[index].quantity,
                                                    +cartItems_1.rows[index].delivery_price,
                                                ])];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                }); }))];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n      DELETE FROM public.bazaar_carts WHERE cart_id = $1;\n      ", [cartId_1.rows[0].cart_id])];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n      DELETE FROM public.bazaar_cart_details where cart_id = $1;\n      ", [cartId_1.rows[0].cart_id])];
                            case 3:
                                _a.sent();
                                //await executeSql("COMMIT");
                                response = {
                                    message: "order generated",
                                    status: true,
                                    data: orderId_1,
                                };
                                res.status(201).json(response).end();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1500);
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.log(error_1.message);
                response = {
                    message: error_1.message,
                    status: false,
                };
                //await executeSql(`ROLLBACK`);
                res.status(406).json(response).end();
                return [2 /*return*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.checkout = checkout;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, amount, options, order, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                amount = req.body.amount;
                _a = {
                    amount: amount * 100,
                    currency: "INR"
                };
                return [4 /*yield*/, (0, async_1.nanoid)(15)];
            case 1: return [4 /*yield*/, (_b.sent()).toUpperCase()];
            case 2:
                options = (_a.receipt = _b.sent(),
                    _a);
                return [4 /*yield*/, razorInstance_1.default.orders.create(options)];
            case 3:
                order = _b.sent();
                if (!!!order)
                    throw new Error("--error while creating order");
                response = {
                    message: "Order created",
                    status: true,
                    data: order,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 4:
                error_2 = _b.sent();
                console.log(error_2.message);
                console.log(error_2);
                response = {
                    message: error_2.message,
                    status: false,
                };
                res.status(406).json(response).end();
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
