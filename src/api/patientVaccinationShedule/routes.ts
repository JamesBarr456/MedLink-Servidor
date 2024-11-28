import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import { patientVaccinationShedulePayloadValidator } from "./validator";
import PatientVaccinationSheduleController from "./controller";

const PatientVaccinationSheduleRouter = Router();

PatientVaccinationSheduleRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientVaccinationShedulePayloadValidator, null),
    PatientVaccinationSheduleController.add
);

export default PatientVaccinationSheduleRouter;
