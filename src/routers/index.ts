// LIBRARIES
import { Router } from "express";
import authRouter from "../api/auth/routes";
import patientRouter from "../api/patient/routes";
import adminRouter from "../api/admin/routes";
import authenticate from "../middleware/authenticate.middleware";
import authorizeAdmin from "../middleware/authorizationAdmin.middelware";
// Routes

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/patient", patientRouter);
apiRouter.use("/admin", authenticate, authorizeAdmin, adminRouter);

export default apiRouter;
