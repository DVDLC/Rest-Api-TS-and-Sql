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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUsers = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { status: true };
    const [total, users] = yield Promise.all([
        user_model_1.default.count({ where: query }),
        user_model_1.default.findAll({
            where: query,
            limit: 2,
            offset: 0
        })
    ]);
    res.status(200).json({
        total,
        users
    });
});
exports.getUsers = getUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByPk(id);
    res.status(200).json({
        user
    });
});
exports.getUserByID = getUserByID;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { name, email, status } = _a, props = __rest(_a, ["name", "email", "status"]);
    const nwUser = yield user_model_1.default.create({
        name,
        email,
        status
    });
    res.status(200).json({
        nwUser
    });
});
exports.createUser = createUser;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { name, email } = _b, props = __rest(_b, ["name", "email"]);
    const user = yield user_model_1.default.findByPk(id);
    if (name || name.length !== 0) {
        user === null || user === void 0 ? void 0 : user.update({ name });
    }
    if (email || name.length !== 0) {
        user === null || user === void 0 ? void 0 : user.update({ email });
    }
    res.status(200).json({
        user
    });
});
exports.updateUsers = updateUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByPk(id);
    const query = { status: false };
    user === null || user === void 0 ? void 0 : user.update(query);
    res.status(200).json({
        user
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controllers.js.map