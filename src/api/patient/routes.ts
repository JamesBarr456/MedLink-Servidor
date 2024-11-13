import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import PatientController from "./controller";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { patientUpdatePayloadValidator } from "./validator";
import { uploadFields } from "../../middleware/uploadFields.middlewares";
import { mongoIdValidator } from "../../generalValidator/idValidator";

const patientRouter = Router();

patientRouter.get(
    "/:id",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.DOCTOR, Roles.ADMIN]),
    schemaValidator(null, mongoIdValidator),
    PatientController.getPatient
);

patientRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientUpdatePayloadValidator, null),
    uploadFields,
    PatientController.update
);

export default patientRouter;
