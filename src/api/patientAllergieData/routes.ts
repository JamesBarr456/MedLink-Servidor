import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import { patientAllergiesDataPayloadValidator } from "./validator";
import PatientAllergieDataController from "./controller";

const patientAllergieDataRouter = Router();

patientAllergieDataRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientAllergiesDataPayloadValidator, null),
    PatientAllergieDataController.add
);

export default patientAllergieDataRouter;
