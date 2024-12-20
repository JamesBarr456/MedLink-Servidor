"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructs an API response object with a success flag and optional payload.
 *
 * @param success - Indicates whether the API request was successful.
 * @param payload - The data returned from the API request, if any.
 * @returns An object with `success` and `payload` properties.
 */
const apiResponse = (success, payload) => {
    return {
        success,
        payload,
    };
};
exports.default = apiResponse;
