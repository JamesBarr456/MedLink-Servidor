import { Router } from "express";
import authRouter from "../api/auth/routes";
import patientRouter from "../api/patient/routes";
import adminRouter from "../api/admin/routes";
import authenticate from "../middleware/authenticate.middleware";
import authorizeAdmin from "../middleware/authorizationAdmin.middelware";
import patientAllergieDataRouter from "../api/patientAllergieData/routes";
import patientFamilyInheritanceRouter from "../api/patientFamilyInheritance/routes";
import patientPathologicalDataRouter from "../api/patientPathologicalData/routes";
import patientNonPathologicalDataRouter from "../api/patientNonPathologicalData/routes";
import PatientVaccinationSheduleRouter from "../api/patientVaccinationShedule/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/patient", patientRouter);
apiRouter.use("/allergie", patientAllergieDataRouter);
apiRouter.use("/family-inheritance", patientFamilyInheritanceRouter);
apiRouter.use("/pathological-data", patientPathologicalDataRouter);
apiRouter.use("/non-pathological-data", patientNonPathologicalDataRouter);
apiRouter.use("/vaccination-shedule", PatientVaccinationSheduleRouter);
apiRouter.use("/admin", authenticate, authorizeAdmin, adminRouter);

export default apiRouter;
