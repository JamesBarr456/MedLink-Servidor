"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an HTTP error with a status code, description, and optional details.
 */
class HttpError {
    constructor(statusText, error, status) {
        this.description = statusText;
        this.details = error !== null && error !== void 0 ? error : undefined;
        this.status = status;
    }
}
exports.default = HttpError;
