"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    const sendErrorDev = (err, req, next) => {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
    };
    const sendErrorProd = (err, req, next) => {
        res.status(err.statusCode).json({
            ok: false,
            status: err.status,
            message: err.message,
        });
    };
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, next);
    }
    else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, req, next);
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=ErrorGlobalHandler.util.js.map