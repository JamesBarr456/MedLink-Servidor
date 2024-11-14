import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import { patientFamilyInheritancePayloadValidator } from "./validator";
import PatientFamilyInheritanceController from "./controller";

const patientFamilyInheritanceRouter = Router();

patientFamilyInheritanceRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    schemaValidator(patientFamilyInheritancePayloadValidator, null),
    PatientFamilyInheritanceController.add
);

export default patientFamilyInheritanceRouter;
