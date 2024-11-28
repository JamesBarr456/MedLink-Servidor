import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import {
    userCreatePayloadValidator,
    userLoginPayloadValidator,
    userForgotPasswordPayloadValidator,
    userResetPasswordPayloadValidator,
    resetPasswordTokenValidator,
} from "./validator";
import AuthController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";

const authRouter = Router();

authRouter.post(
    "/register",
    schemaValidator(userCreatePayloadValidator, null),
    AuthController.register
);

authRouter.post(
    "/login",
    schemaValidator(userLoginPayloadValidator, null),
    AuthController.login
);

authRouter.post(
    "/forgot-password",
    schemaValidator(userForgotPasswordPayloadValidator, null),
    AuthController.forgotPassword
);

authRouter.post(
    "/update-password",
    authenticate,
    schemaValidator(userResetPasswordPayloadValidator, null),
    AuthController.updatePassword
);

authRouter.post(
    "/reset-password/:token",
    schemaValidator(
        userResetPasswordPayloadValidator,
        resetPasswordTokenValidator
    ),
    AuthController.resetPassword
);

export default authRouter;
