import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import PatientNonPathologicalDataController from "./controller";
import { patientNonPathologicalDataPayloadValidator } from "./validator";

const patientNonPathologicalDataRouter = Router();

patientNonPathologicalDataRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientNonPathologicalDataPayloadValidator, null),
    PatientNonPathologicalDataController.add
);

export default patientNonPathologicalDataRouter;
