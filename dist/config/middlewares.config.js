"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_utils_1 = require("../utils/path.utils");
/**
 * Configures the middleware for the Express application.
 * @param app - The Express application instance.
 */
class MiddlewareConfig {
    /**
     * Configures the middleware for the Express application.
     * @param app - The Express application instance.
     * @description This method sets up various middleware for the Express application, including:
     * - CORS configuration to allow cross-origin requests from the specified origin
     * - Serving static files from the "src/public" directory
     * - Parsing cookies
     * - Parsing JSON and URL-encoded request bodies
     * - Serving the Swagger UI for API documentation
     */
    static config(app) {
        app.use((0, cors_1.default)({
            origin: "http://localhost:3000",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "Content-Disposition",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials",
            ],
        }));
        app.use(express_1.default.static(path_1.default.join(process.cwd(), "src", "public")));
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        const swaggerOptions = {
            definition: {
                openapi: "3.0.1",
                info: {
                    title: "Documentacion de MedLink",
                    description: "API de MedLink",
                    version: "1.0.0",
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        },
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
            },
            apis: [`${path_utils_1.rootPath}/docs/**/*.yaml`],
        };
        const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
        app.use("/apidocs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
}
exports.default = MiddlewareConfig;
