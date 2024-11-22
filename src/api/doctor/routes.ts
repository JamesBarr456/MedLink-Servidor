import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { mongoIdValidator } from "../../generalValidator/idValidator";
import DoctorController from "./controller";

const doctorRouter = Router();

doctorRouter.get(
    "/:id",
    schemaValidator(null, mongoIdValidator),
    DoctorController.getDoctor
);

export default doctorRouter;
