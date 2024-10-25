// LIBRARIES
import { Router } from "express";
// CONTROLLERS
import patientController from "./controller";
// MIDDLEWARES
import { uploadFields } from "../../middleware/uploadFields.middlewares";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
// VALIDATORS
import { patientCreatePayloadValidator } from "./validator";

const patientRouter = Router();

patientRouter.post(
    "/register",
    uploadFields,
    schemaValidator(patientCreatePayloadValidator, null),
    patientController.register
);

export default patientRouter;
