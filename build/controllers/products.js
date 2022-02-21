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
exports.fetchCategories = exports.productDetail = exports.fetchProducts = void 0;
var executeSql_1 = require("../utils/executeSql");
/**
 * @type POST
 * @route /public/fetchProducts
 */
var fetchProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, limit, filter, url, filterText, products, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                limit = req.query.limit;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                filter = req.query.filter;
                if (+limit > 100 || !limit)
                    throw new Error("Invalid limit");
                url = "";
                filterText = " WHERE status = 'active' AND quantity > 0 ";
                switch (filter) {
                    case "category":
                        filterText += " AND category_id = ".concat((_a = req.query.categoryId) !== null && _a !== void 0 ? _a : 0, " ");
                        break;
                    default:
                        filterText += " ORDER BY RANDOM() ";
                        break;
                }
                url =
                    "SELECT PRODUCT_ID,\n      CATEGORY_ID,\n      PRODUCT_NAME,\n      PRODUCT_IMAGE,\n      QUANTITY,\n      PRICE,\n      DELIVERY_PRICE,\n      PRODUCT_DESC\n      FROM PUBLIC.BAZAAR_PRODUCTS " +
                        filterText +
                        " LIMIT($1);";
                return [4 /*yield*/, (0, executeSql_1.executeSql)(url, [limit])];
            case 2:
                products = _b.sent();
                if (!products.rows[0])
                    throw new Error("No products available");
                response = {
                    message: "Products fetched successfully",
                    status: true,
                    data: products.rows,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 3:
                error_1 = _b.sent();
                response = {
                    message: error_1.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchProducts = fetchProducts;
/**
 * @type GET
 * @route /public/productDetail
 */
var productDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, productId, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.query.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n        SELECT PRODUCT_ID,\n        CATEGORY_ID,\n        PRODUCT_NAME,\n        PRODUCT_IMAGE,\n        QUANTITY,\n        CREATED_ON,\n        UPDATED_ON,\n        STATUS,\n        PRICE,\n        DELIVERY_PRICE,\n        PRODUCT_DESC\n        FROM PUBLIC.BAZAAR_PRODUCTS\n        WHERE PRODUCT_ID = $1;\n        ", [productId])];
            case 2:
                products = _a.sent();
                if (!products.rows[0])
                    throw new Error("No product found");
                response = {
                    message: "Product fetched successfully",
                    status: true,
                    data: products.rows[0],
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                response = {
                    message: error_2.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.productDetail = productDetail;
/**
 * @type GET
 * @route /public/category
 */
var fetchCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, sql, categories, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = req.query.includeImg
                    ? "select distinct on (bp.category_id) bp.category_id,\n    bc.category_name ,\n    bp.product_id,bp.product_name ,bp.product_image \n    from bazaar_products bp \n    left join bazaar_categories bc \n    on bc.category_id = bp.category_id \n    order by category_id;"
                    : "select category_id,category_name from bazaar_categories order by category_id";
                return [4 /*yield*/, (0, executeSql_1.executeSql)(sql)];
            case 1:
                categories = _a.sent();
                response = {
                    message: "categories fetched successfully",
                    status: true,
                    data: categories.rows,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_3 = _a.sent();
                console.log("--error ", error_3.stack);
                response = {
                    message: error_3.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchCategories = fetchCategories;
