// LIBRARIES
import { Router } from "express";
import authRouter from "../api/auth/routes";
import patientRouter from "../api/patient/routes";
// Routes

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/patient", patientRouter);

export default apiRouter;
