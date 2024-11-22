import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { mongoIdValidator } from "../../generalValidator/idValidator";
import DoctorController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import { uploadFields } from "../../middleware/uploadFields.middlewares";
import { doctorUpdatePayloadValidator } from "./validator";

const doctorRouter = Router();

doctorRouter.get(
    "/:id",
    schemaValidator(null, mongoIdValidator),
    DoctorController.getDoctor
);

doctorRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.DOCTOR, Roles.ADMIN]),
    schemaValidator(doctorUpdatePayloadValidator, null),
    uploadFields,
    DoctorController.update
);

export default doctorRouter;
