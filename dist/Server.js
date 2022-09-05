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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// utils
const ApiError_util_1 = require("./utils/ApiError.util");
const ErrorGlobalHandler_util_1 = require("./utils/ErrorGlobalHandler.util");
const httpStatusCode_utils_1 = require("./utils/httpStatusCode.utils");
// database
const connection_1 = __importDefault(require("./db/connection"));
class Server {
    constructor() {
        this.paths = {
            users: '/api/v1/users',
            error: '*'
        };
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || "4000";
        this.middlewares();
        this.DBconnection();
        this.routes();
        this.notFound();
        this.errorHandler();
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.users, user_routes_1.default);
    }
    notFound() {
        this.app.all(this.paths.error, (req, res, next) => {
            next(new ApiError_util_1.ApiError(httpStatusCode_utils_1.HttpStatusCode.BAD_REQUEST, `${req.method} ${req.originalUrl} is not found`));
        });
    }
    errorHandler() {
        this.app.use(ErrorGlobalHandler_util_1.globalErrorHandler);
    }
    DBconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    connection_1.default.authenticate(),
                    connection_1.default.sync( /* force: true */)
                ]);
                console.log('DB authenticated and sync');
            }
            catch (err) {
                console.log('Something went wrong', err);
            }
        });
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running at port ${this.PORT}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map