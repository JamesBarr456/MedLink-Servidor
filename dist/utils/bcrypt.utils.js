"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptUtils = void 0;
// LIBRARIES
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Utility class for handling bcrypt password hashing and verification.
 */
class BcryptUtils {
    /**
     * Generates a bcrypt hash for the provided password.
     *
     * @param password - The password to hash.
     * @returns The bcrypt hash of the password.
     */
    static createHash(password) {
        return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    }
    /**
     * Verifies if the provided password matches the password hash stored for the given user.
     *
     * @param user - The user object containing the stored password hash.
     * @param password - The password to verify against the stored hash.
     * @returns `true` if the password matches the stored hash, `false` otherwise.
     */
    static isValidPassword(user, password) {
        return bcrypt_1.default.compareSync(password, user.password);
    }
}
exports.BcryptUtils = BcryptUtils;
