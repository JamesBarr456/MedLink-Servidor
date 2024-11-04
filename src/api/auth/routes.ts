import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import {
    userCreatePayloadValidator,
    userLoginPayloadValidator,
} from "./validator";
import AuthController from "./controller";

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

export default authRouter;
