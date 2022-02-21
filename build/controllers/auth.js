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
exports.login = exports.register = exports.logout = void 0;
var executeSql_1 = require("../utils/executeSql");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../environment");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * @route /public/logout
 */
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, token, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                return [4 /*yield*/, (0, executeSql_1.executeSql)("DELETE FROM public.bazaar_tokens WHERE token = $1;", [
                        "".concat(token),
                    ])];
            case 1:
                _b.sent();
                response = {
                    message: "User logged out",
                    status: true,
                    data: true,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_1 = _b.sent();
                console.log(error_1.message);
                response = {
                    message: error_1.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
/**
 * @route /public/register
 */
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, firstName, lastName, email, phone, password, hashedPassword_1, rows, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phone = _a.phone, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, executeSql_1.executeSql)("SELECT COUNT(USER_ID) FROM BAZAAR_USERS WHERE LOWER(EMAIL) = LOWER($1)", [email.trim()])];
            case 2:
                rows = (_b.sent()).rows;
                if (rows[0].count > 0) {
                    throw new Error("User already exists");
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 8, function (err, hash) { return __awaiter(void 0, void 0, void 0, function () {
                        var userId, token;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        throw new Error("error occurred while hashing");
                                    hashedPassword_1 = hash;
                                    return [4 /*yield*/, (0, executeSql_1.executeSql)("\n        INSERT INTO PUBLIC.BAZAAR_USERS(\n            FIRST_NAME,\n            LAST_NAME,\n            EMAIL,\n            PHONE,\n            PASSWORD)\n            VALUES ($1, $2, $3, $4, $5) RETURNING USER_ID;\n        ", [firstName, lastName, email, +phone, hashedPassword_1])];
                                case 1:
                                    userId = _a.sent();
                                    token = jsonwebtoken_1.default.sign({
                                        data: userId.rows[0].user_id,
                                    }, "".concat(environment_1.jwtSecret), { expiresIn: "5d" });
                                    return [4 /*yield*/, (0, executeSql_1.executeSql)("\n        INSERT INTO PUBLIC.BAZAAR_TOKENS(\n            USER_ID,\n            TOKEN)\n            VALUES ($1, $2);\n        ", [userId.rows[0].user_id, token])];
                                case 2:
                                    _a.sent();
                                    response = {
                                        message: "User registered successfully",
                                        status: true,
                                        data: "Bearer " + token,
                                    };
                                    res.status(201).json(response).end();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2.message);
                response = {
                    message: error_2.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
/**
 * @route /public/login
 */
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, email, password, user_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!email || !password)
                    throw new Error("email or password couldn't be blank");
                return [4 /*yield*/, (0, executeSql_1.executeSql)("SELECT user_id,password FROM BAZAAR_USERS WHERE LOWER(EMAIL) = LOWER($1) and access = 'user';", ["".concat(email.trim())])];
            case 2:
                user_1 = _b.sent();
                if (!user_1.rows[0]) {
                    throw new Error("User does not exist");
                }
                bcryptjs_1.default.compare(password, user_1.rows[0].password, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
                    var token;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // if (err) throw new Error("Password didnt match");
                                if (!result || err) {
                                    response = {
                                        message: "Password didnt match",
                                        status: false,
                                        data: false,
                                    };
                                    res.status(408).json(response).end();
                                    return [2 /*return*/];
                                }
                                token = jsonwebtoken_1.default.sign({
                                    data: user_1.rows[0].user_id,
                                }, "".concat(environment_1.jwtSecret), { expiresIn: "5d" });
                                return [4 /*yield*/, (0, executeSql_1.executeSql)("\n        INSERT INTO PUBLIC.BAZAAR_TOKENS(\n            USER_ID,\n            TOKEN)\n            VALUES ($1, $2);\n        ", [user_1.rows[0].user_id, token])];
                            case 1:
                                _a.sent();
                                response = {
                                    message: "User logged in successfully",
                                    status: true,
                                    data: "Bearer " + token,
                                };
                                res.status(201).json(response).end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3.message);
                response = {
                    message: error_3.message,
                    status: false,
                    data: false,
                };
                res.status(408).json(response).end();
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
