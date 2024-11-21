import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { Roles } from "../../constants/Roles";
import { patientMedicationsPayloadValidator } from "./validator";
import PatientMedicationsController from "./controller";

const patientMedicationsRouter = Router();

patientMedicationsRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    (req, res, next) => {
        console.log("patientMedicationsRouter -> / -> req.body", req.body);
        next();
    },
    schemaValidator(patientMedicationsPayloadValidator, null),
    PatientMedicationsController.add
);

export default patientMedicationsRouter;
