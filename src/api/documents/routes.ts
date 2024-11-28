import { Router } from "express";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";

import { Roles } from "../../constants/Roles";
import { uploadFields } from "../../middleware/uploadFields.middlewares";
import DocumentsController from "./controller";

const documentsRouter = Router();

documentsRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.PATIENT, Roles.ADMIN]),
    uploadFields,
    DocumentsController.add
);

export default documentsRouter;
