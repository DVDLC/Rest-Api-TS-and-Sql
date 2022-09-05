"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(httpsStatusCode, msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = httpsStatusCode;
        this.status = `${this.statusCode}`.startsWith('5') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.util.js.map