import { Router } from "express";
import AdminController from "./controller";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { mongoIdValidator } from "../../generalValidator/idValidator";
import { Roles } from "../../constants/Roles";
import authenticate from "../../middleware/authenticate.middleware";
import { userCreatePayloadValidator } from "../auth/validator";

const adminRouter = Router();


adminRouter.get(
    "/doctors",
    authenticate,
    authorizeRoles([Roles.ADMIN]),
    AdminController.getAllDoctors
);

adminRouter.post(
    "/doctors",
    authenticate,
    authorizeRoles([Roles.ADMIN]),
    schemaValidator(userCreatePayloadValidator, null),
    AdminController.createDoctor
);

adminRouter.delete(
    "/doctors/:id",
    authenticate,
    authorizeRoles([Roles.ADMIN]),
    schemaValidator(null, mongoIdValidator),
    AdminController.deleteDoctor
);

adminRouter.get(
    "/patients",
    authenticate,
    authorizeRoles([Roles.ADMIN]),
    AdminController.getAllPatients
);

export default adminRouter;