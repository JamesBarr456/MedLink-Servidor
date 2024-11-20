import { Router } from "express";
import AdminController from "./controller";

const adminRouter = Router();


adminRouter.get(
    "/doctors",
    AdminController.getAllDoctors
);

adminRouter.post(
    "/doctors",
    AdminController.createDoctor
);

adminRouter.get(
    "/patients",
    AdminController.getAllPatients
);

export default adminRouter;