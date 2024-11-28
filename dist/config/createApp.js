"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRERIES
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
// MANAGERS
const mongoManager_1 = __importDefault(require("../db/mongoManager"));
/**
 * @class ExpressAppCreator
 * @description A class that creates and configures an Express application, with support for clustering.
 */
class ExpressAppCreator {
    /**
     * @constructor
     * @description Initializes the ExpressAppCreator instance.
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.modeCluster = process.env.MODE === "CLUSTER";
        this.PORT = Number(process.env.BACKPORT) || 8082;
    }
    /**
     * @method createExpressApp
     * @description Creates and configures the Express application.
     * @returns {express.Application} The configured Express application.
     */
    createExpressApp() {
        mongoManager_1.default.connect();
        if (this.modeCluster && cluster_1.default.isPrimary) {
            this.setupCluster();
        }
        else {
            this.startServer();
        }
        return this.app;
    }
    /**
     * @method setupCluster
     * @description Sets up the cluster mode for the application.
     * @private
     */
    setupCluster() {
        const numCPUS = (0, os_1.cpus)().length;
        console.log(`CPUs Quantity: ${numCPUS}`);
        console.log(`PID MASTER: ${process.pid}`);
        for (let i = 0; i < numCPUS; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", (worker) => {
            console.log("Worker", worker.process.pid, "died", new Date().toLocaleString());
            cluster_1.default.fork();
        });
    }
    /**
     * @method startServer
     * @description Starts the Express server.
     * @private
     */
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Express server listening on port ${this.PORT} - PID WORKER ${process.pid}`);
        });
    }
}
exports.default = ExpressAppCreator;
