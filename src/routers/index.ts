// LIBRARIES
import { Router } from "express";
import authRouter from "../api/auth/routes";
import patientRouter from "../api/patient/routes";
import adminRouter from "../api/admin/routes";
import authenticate from "../middleware/authenticate.middleware";
import authorizeAdmin from "../middleware/authorizationAdmin.middelware";
import patientAllergieDataRouter from "../api/patientAllergieData/routes";
import patientFamilyInheritanceRouter from "../api/patientFamilyInheritance/routes";
// Routes

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/patient", patientRouter);
apiRouter.use("/allergie", patientAllergieDataRouter);
apiRouter.use("/family-inheritance", patientFamilyInheritanceRouter);
apiRouter.use("/admin", authenticate, authorizeAdmin, adminRouter);

export default apiRouter;
