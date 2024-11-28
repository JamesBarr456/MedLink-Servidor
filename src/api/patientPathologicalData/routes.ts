import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import { patientPathologicalDataPayloadValidator } from "./validator";
import PatientPathologicalDataController from "./controller";

const patientPathologicalDataRouter = Router();

patientPathologicalDataRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientPathologicalDataPayloadValidator, null),
    PatientPathologicalDataController.add
);

export default patientPathologicalDataRouter;
