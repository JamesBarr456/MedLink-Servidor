import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import {
    userCreatePayloadValidator,
    userLoginPayloadValidator,
    userForgotPasswordPayloadValidator,
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

authRouter.get("/test", authenticate);

export default authRouter;
