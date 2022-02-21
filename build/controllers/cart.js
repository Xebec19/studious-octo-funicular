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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.removeItem = exports.readCart = exports.editCart = void 0;
var calcTotal_1 = require("../utils/calcTotal");
var executeSql_1 = require("../utils/executeSql");
var getCart_1 = require("../utils/getCart");
var getUserFromToken_1 = require("../utils/getUserFromToken");
/**
 * @type POST
 * @access PRIVATE
 * @route /cart/edit_cart
 */
var editCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, cartId, cartDetailsId, qty, product, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cartId = _a.cartId, cartDetailsId = _a.cartDetailsId, qty = _a.qty;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!cartDetailsId || !qty) {
                    throw new Error("Incomplete parameters");
                }
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    SELECT BP.QUANTITY AS PRODUCT_QUANTITY,BCD.QUANTITY,BP.PRODUCT_ID\n    FROM PUBLIC.BAZAAR_CART_DETAILS BCD\n    LEFT JOIN BAZAAR_PRODUCTS BP ON BP.PRODUCT_ID = BCD.PRODUCT_ID\n    WHERE CD_ID = $1;\n    ", [cartDetailsId])];
            case 2:
                product = _b.sent();
                if (+product.rows[0].quantity + +product.rows[0].product_quantity < +qty) {
                    throw new Error("Sorry, ".concat(qty, " units not available"));
                }
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    UPDATE PUBLIC.BAZAAR_CART_DETAILS\n    SET QUANTITY = $1\n    WHERE CD_ID = $2;", [qty, cartDetailsId])];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n      UPDATE bazaar_products SET QUANTITY = $1 \n      WHERE PRODUCT_ID = $2;\n      ", [
                        product.rows[0].quantity + product.rows[0].product_quantity - qty,
                        product.rows[0].product_id,
                    ])];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, calcTotal_1.calcTotal)(cartId)];
            case 5:
                _b.sent();
                response = {
                    message: "cart updated successfully",
                    status: true,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 6:
                error_1 = _b.sent();
                response = {
                    message: error_1.message,
                    status: false,
                    data: false,
                };
                console.log(error_1.message);
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.editCart = editCart;
/**
 * @type POST
 * @access PRIVATE
 * @route /cart/read_cart
 */
var readCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, cartId, token, userId, cartDetails, cartSummary, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                cartId = void 0;
                token = req.headers["authorization"];
                if (!token)
                    throw new Error("Token not present");
                return [4 /*yield*/, (0, getUserFromToken_1.findUserByToken)(token)];
            case 1:
                userId = _a.sent();
                return [4 /*yield*/, (0, getCart_1.getCart)(userId)];
            case 2:
                cartId = _a.sent();
                if (!cartId)
                    throw new Error("No cart id found");
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    SELECT CD_ID,\n    CART_ID,\n    PRODUCT_ID,\n    (SELECT PRODUCT_NAME FROM BAZAAR_PRODUCTS BP WHERE BP.PRODUCT_ID = BCD.PRODUCT_ID) \n    AS PRODUCT_NAME,\n    (SELECT PRODUCT_IMAGE FROM BAZAAR_PRODUCTS BP WHERE BP.PRODUCT_ID = BCD.PRODUCT_ID)\n    AS PRODUCT_IMAGE,\n    PRODUCT_PRICE,\n    QUANTITY,\n    DELIVERY_PRICE\n    FROM PUBLIC.BAZAAR_CART_DETAILS BCD\n    WHERE CART_ID = $1 ORDER BY CD_ID;\n    ", [cartId])];
            case 3:
                cartDetails = _a.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n      SELECT * FROM BAZAAR_CARTS\n      WHERE CART_ID = $1\n      ", [cartId])];
            case 4:
                cartSummary = _a.sent();
                if (!cartDetails) {
                    throw new Error("No item in cart");
                }
                // return cartId;
                response = {
                    message: "User's cart fetched",
                    status: true,
                    data: {
                        cartSummary: cartSummary.rows[0],
                        cartItems: cartDetails.rows,
                    },
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 5:
                error_2 = _a.sent();
                response = {
                    message: error_2.message,
                    status: false,
                    data: false,
                };
                console.log(error_2.message);
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.readCart = readCart;
/**
 * @type POST
 * @route /cart/remove_item
 */
var removeItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, cartDetailsId, cartId, token, userId, checkCart, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, cartDetailsId = _a.cartDetailsId, cartId = _a.cartId;
                if (!cartDetailsId || !cartId)
                    throw new Error("Invalid parameters");
                token = req.headers["authorization"];
                return [4 /*yield*/, (0, getUserFromToken_1.findUserByToken)(token)];
            case 1:
                userId = _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    SELECT BCD.CD_ID,BCD.PRODUCT_ID,BCD.QUANTITY FROM BAZAAR_CART_DETAILS BCD LEFT JOIN BAZAAR_CARTS BC ON BC.CART_ID = BCD.CART_ID LEFT JOIN BAZAAR_USERS BU ON BC.USER_ID = BU.USER_ID  \n    WHERE BU.USER_ID = $1 AND BC.CART_ID = $2 AND BCD.CD_ID = $3;\n    ", [userId, cartId, cartDetailsId])];
            case 2:
                checkCart = _b.sent();
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    UPDATE BAZAAR_PRODUCTS SET QUANTITY = QUANTITY + $1 WHERE PRODUCT_ID = $2;\n    ", [checkCart.rows[0].quantity, checkCart.rows[0].product_id])];
            case 3:
                _b.sent();
                if (!checkCart.rows[0].cd_id)
                    throw new Error("Cart not found");
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n    DELETE FROM BAZAAR_CART_DETAILS\n    WHERE CD_ID = $1;\n    ", [cartDetailsId])];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, calcTotal_1.calcTotal)(cartId)];
            case 5:
                _b.sent();
                response = {
                    message: "Data deleted successfully",
                    status: true,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 6:
                error_3 = _b.sent();
                response = {
                    message: error_3.message,
                    status: false,
                };
                res.status(406).json(response).end();
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.removeItem = removeItem;
/**
 * @type POST
 * @access PRIVATE
 * @route /cart/add_item
 */
var addToCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, productId, qty, token, userId, product, userCartId, cartId, cartDetailId, cartDetailsStatus, updatedQty, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, qty = _a.qty;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 13, , 14]);
                token = req.headers["authorization"];
                if (!token)
                    throw new Error("token not present");
                if (!productId || !qty)
                    throw new Error("Invalid Parameters");
                return [4 /*yield*/, (0, getUserFromToken_1.findUserByToken)(token)];
            case 2:
                userId = _b.sent();
                if (!userId)
                    throw new Error("No user found");
                return [4 /*yield*/, (0, executeSql_1.executeSql)("SELECT product_id, category_id, product_name, product_image, quantity, created_on, updated_on, status, price, delivery_price, product_desc\n        FROM public.bazaar_products where product_id = $1 and status = 'active'", [productId])];
            case 3:
                product = _b.sent();
                if (!product) {
                    throw new Error("Product not available");
                }
                if (qty > product.rows[0].quantity) {
                    throw new Error("Insufficient stock");
                }
                userCartId = void 0;
                return [4 /*yield*/, (0, getCart_1.getCart)(userId)];
            case 4:
                cartId = _b.sent();
                cartDetailId = void 0;
                return [4 /*yield*/, (0, executeSql_1.executeSql)("WITH findCartDetail as (select (case \n      when count(cart_id) > 0 then 'Present' \n      when count(cart_id) = 0 then 'absent' END) status \n  from bazaar_cart_details where cart_id = $1 and product_id = $2)\n  SELECT * from findCartDetail;", [cartId, product.rows[0].product_id])];
            case 5:
                cartDetailsStatus = _b.sent();
                if (!(cartDetailsStatus.rows[0].status === "absent")) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, executeSql_1.executeSql)("INSERT INTO public.bazaar_cart_details(\n                cart_id, product_id, product_price, quantity, delivery_price)\n                VALUES ($1, $2, $3, $4, $5) RETURNING cart_id;", [
                        cartId,
                        product.rows[0].product_id,
                        product.rows[0].price,
                        qty,
                        product.rows[0].delivery_price,
                    ])];
            case 6:
                cartDetailId = _b.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, (0, executeSql_1.executeSql)("SELECT CD_ID,QUANTITY FROM BAZAAR_CART_DETAILS WHERE PRODUCT_ID = $1 AND CART_ID = $2", [product.rows[0].product_id, cartId])];
            case 8:
                cartDetailId = _b.sent();
                updatedQty = +cartDetailId.rows[0].quantity + qty;
                return [4 /*yield*/, (0, executeSql_1.executeSql)("update bazaar_cart_details set quantity = $1 where cd_id = $2", [updatedQty, cartDetailId.rows[0].cd_id])];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [4 /*yield*/, (0, executeSql_1.executeSql)("update bazaar_products set quantity = $1 where product_id = $2", [product.rows[0].quantity - qty, product.rows[0].product_id])];
            case 11:
                _b.sent();
                return [4 /*yield*/, (0, calcTotal_1.calcTotal)(cartId)];
            case 12:
                _b.sent();
                response = {
                    message: "Product added to cart successfully",
                    status: true,
                    data: product.rows[0].quantity - qty,
                };
                res.status(201).json(response).end;
                return [2 /*return*/];
            case 13:
                error_4 = _b.sent();
                response = {
                    message: error_4.message,
                    status: false,
                    data: false,
                };
                console.log(error_4.message);
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.addToCart = addToCart;
