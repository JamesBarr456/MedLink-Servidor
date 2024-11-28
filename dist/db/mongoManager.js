"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const mongoose_1 = __importDefault(require("mongoose"));
// CONFIGS
const db_config_1 = __importDefault(require("../config/db.config"));
/**
 * Manages the connection to a MongoDB database using the Mongoose library.
 * This class is a singleton, ensuring there is only one instance of the MongoDB connection.
 * It connects to the MongoDB database using the configuration settings from the `db.config.ts` file.
 * If the connection is successful, it logs a success message. If there is an error, it logs the error and throws an exception.
 */
class MongoManager {
    constructor() {
        mongoose_1.default.set("strictQuery", false);
        const mongoUri = db_config_1.default.mongo.uri;
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined.");
        }
        mongoose_1.default.connect(mongoUri);
        const db = mongoose_1.default.connection;
        db.on("error", (error) => {
            console.log(`db connection failed: ${error}`);
            throw error;
        });
        db.once("open", () => {
            console.log("db connection succeeded");
        });
    }
    static connect() {
        if (!MongoManager._instance) {
            MongoManager._instance = new MongoManager();
        }
        return MongoManager._instance;
    }
}
MongoManager._instance = null;
exports.default = MongoManager;
