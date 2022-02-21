"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = void 0;
// import { dbDatabase, dbHost, dbPassword, dbPort, dbUser } from "../environment";
var Pool = require("pg").Pool;
// const config = {
//   user: `${dbUser}`,
//   host: `${dbHost}`,
//   database: `${dbDatabase}`,
//   password: `${dbPassword}`,
//   port: `${dbPort}`,
// };
var config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
var pool = new Pool(config);
pool.on("error", function (err, client) {
    console.error("Error:", err);
});
console.log(config);
var dbQuery = function (text, params) { return pool.query(text, params); };
exports.dbQuery = dbQuery;
