"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CONFIGS
const createApp_1 = __importDefault(require("./config/createApp"));
const middlewares_config_1 = __importDefault(require("./config/middlewares.config"));
// ROUTERS
const routers_1 = __importDefault(require("./routers"));
const appCreator = new createApp_1.default();
const app = appCreator.createExpressApp();
middlewares_config_1.default.config(app);
app.use("/api", routers_1.default);
exports.default = app;
