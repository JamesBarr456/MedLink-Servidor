// LIBRARIES
import { Router } from "express";
// Routes
import patientRouter from "../api/patient/routes";

const apiRouter = Router();

apiRouter.use("/auth", patientRouter);

export default apiRouter;
