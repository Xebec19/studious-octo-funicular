"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = void 0;
var environment_1 = require("../environment");
var Pool = require("pg").Pool;
var config = {
    user: "".concat(environment_1.dbUser),
    host: "".concat(environment_1.dbHost),
    database: "".concat(environment_1.dbDatabase),
    password: "".concat(environment_1.dbPassword),
    port: "".concat(environment_1.dbPort),
};
// const config = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// };
var pool = new Pool(config);
pool.on("error", function (err, client) {
    console.error("Error:", err);
});
console.log(config);
var dbQuery = function (text, params) { return pool.query(text, params); };
exports.dbQuery = dbQuery;
