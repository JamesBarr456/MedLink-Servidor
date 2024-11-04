import crypto from "crypto";

export function generetePasswordResetToken(): {
    token: string;
    expires: number;
} {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 1 * 1000 * 60 * 60;
    return { token, expires };
}
