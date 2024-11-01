import HTTP_STATUS from "../../constants/HttpStatus";
import { BcryptUtils } from "../../utils/bcrypt.utils";
import { sign } from "jsonwebtoken";
import HttpError from "../../utils/HttpError.utils";
import UserDAO from "./dao";
import { UserLoginFields } from "./interface";
import User from "./model";

export default class UserService {
    static async loginUser(
        userData: UserLoginFields
    ): Promise<{ token: string }> {
        try {
            const userDao = new UserDAO(User);
            const userFound = await userDao.find({
                email: userData.email,
            });
            if (!userFound || userFound.length === 0) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }
            const user = userFound[0];

            const isPasswordValid = BcryptUtils.isValidPassword(
                user,
                userData.password
            );

            if (!isPasswordValid) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }

            const token = sign(
                {
                    id: user._id,
                    role: user.role,
                    nbf: Math.floor(Date.now() / 1000),
                },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );

            return { token };
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }
}
