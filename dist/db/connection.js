"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map