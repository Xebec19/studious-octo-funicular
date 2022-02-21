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
exports.seedingFunc = void 0;
var faker_1 = __importDefault(require("faker"));
var fs_1 = __importDefault(require("fs"));
var categoryTranslation = function () { return __awaiter(void 0, void 0, void 0, function () {
    var categoryName, createdOn;
    return __generator(this, function (_a) {
        categoryName = faker_1.default.music.genre();
        createdOn = faker_1.default.date.recent().toLocaleDateString();
        return [2 /*return*/, "'".concat(categoryName, "','").concat(createdOn, "','active'")];
    });
}); };
var productTranslation = function () { return __awaiter(void 0, void 0, void 0, function () {
    var productName, quantity, productImage, price, deliveryPrice, productDesc, gender, createdOn, updatedOn;
    return __generator(this, function (_a) {
        productName = faker_1.default.commerce.productName();
        quantity = faker_1.default.datatype.number();
        productImage = faker_1.default.image.fashion();
        price = faker_1.default.finance.amount();
        deliveryPrice = faker_1.default.finance.amount();
        productDesc = faker_1.default.lorem.paragraph();
        gender = +Math.random().toFixed(1) > 0.6 ? 'Male' : 'Female';
        createdOn = faker_1.default.date.past().toLocaleDateString();
        updatedOn = faker_1.default.date.recent().toLocaleDateString();
        return [2 /*return*/, "'".concat(productName, "','").concat(productImage, "',").concat(quantity, ",'").concat(createdOn, "','").concat(updatedOn, "','").concat(+Math.random().toFixed(1) > 0.6 ? 'active' : 'unactive', "',").concat(price, ",").concat(deliveryPrice, ",'").concat(productDesc, "','").concat(gender, "',1")];
    });
}); };
var createCategoryData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = "INSERT INTO bazaar_categories\n  (category_name, created_on, status)\n  VALUES(".concat;
                return [4 /*yield*/, categoryTranslation()];
            case 1: return [2 /*return*/, _a.apply("INSERT INTO bazaar_categories\n  (category_name, created_on, status)\n  VALUES(", [_b.sent(), ");\n  "])];
        }
    });
}); };
var createProductData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = "INSERT INTO bazaar_products\n  (category_id, product_name, product_image, quantity, created_on, updated_on, status, price, delivery_price, product_desc, gender, country_id)\n  VALUES(".concat(+Math.random().toFixed(1) * 10 + 1, ",")).concat;
                return [4 /*yield*/, productTranslation()];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), ");\n  "])];
        }
    });
}); };
var seeding = new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryScript, productScript, i, _a, i, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                categoryScript = '';
                productScript = '';
                i = 0;
                _c.label = 1;
            case 1:
                if (!(i < 10)) return [3 /*break*/, 4];
                _a = categoryScript;
                return [4 /*yield*/, createCategoryData()];
            case 2:
                categoryScript = _a + _c.sent();
                _c.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                i = 0;
                _c.label = 5;
            case 5:
                if (!(i < 100)) return [3 /*break*/, 8];
                _b = productScript;
                return [4 /*yield*/, createProductData()];
            case 6:
                productScript = _b + _c.sent();
                _c.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                resolve({ categoryScript: categoryScript, productScript: productScript });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _c.sent();
                console.log('--error ', error_1.stack);
                reject();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
var seedingFunc = function () {
    console.log('--seeding started');
    seeding.then(function (data) {
        fs_1.default.writeFile('src/assets/seeding/category.sql', data.categoryScript, function (err) {
            if (err) {
                console.error(err);
                throw new Error(err.message);
            }
        });
        fs_1.default.writeFile('src/assets/seeding/product.sql', data.productScript, function (err) {
            if (err) {
                console.error(err);
                throw new Error(err.message);
            }
        });
        console.log('--seeding completed');
    }).catch(function (error) {
        console.log('--error ', error.stack);
        console.log('--seeding stopped');
    });
};
exports.seedingFunc = seedingFunc;
