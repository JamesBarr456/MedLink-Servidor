import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import PatientController from "./controller";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { patientUpdatePayloadValidator } from "./validator";
import { uploadFields } from "../../middleware/uploadFields.middlewares";

const patientRouter = Router();

patientRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientUpdatePayloadValidator, null),
    uploadFields,
    PatientController.update
);

export default patientRouter;
