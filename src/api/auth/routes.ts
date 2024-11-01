import { Router } from "express";
import patientController from "../patient/controller";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { patientCreatePayloadValidator } from "../patient/validator";

const authRouter = Router();

authRouter.post(
    "/register",
    schemaValidator(patientCreatePayloadValidator, null),
    patientController.register
);
