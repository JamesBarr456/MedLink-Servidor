// LIBRARIES
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

/**
 * Configures the middleware for the Express application.
 * @param app - The Express application instance.
 */
export default class MiddlewareConfig {
    /**
     * Configures the middleware for the Express application.
     * @param app - The Express application instance.
     * @description This method sets up various middleware for the Express application, including:
     * - CORS configuration to allow cross-origin requests from the specified origin
     * - Serving static files from the "src/public" directory
     * - Parsing cookies
     * - Parsing JSON and URL-encoded request bodies
     */
    static config(app: express.Application): void {
        app.use(
            cors({
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
            })
        );
        app.use(express.static(path.join(process.cwd(), "src", "public")));
        app.use(cookieParser());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
}
