"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ENVIROMENT VARIABLES
const enviroment_config_1 = __importDefault(require("./enviroment.config"));
const { MONGO_URI, DATABASE, TEST_DATABASE, NODE_ENV } = enviroment_config_1.default;
const databaseName = NODE_ENV === "test" ? TEST_DATABASE : DATABASE;
const DB_CONFIG = {
    mongo: {
        uri: MONGO_URI
            ? `${MONGO_URI}/${databaseName}?retryWrites=true&w=majority`
            : null,
    },
};
exports.default = DB_CONFIG;
