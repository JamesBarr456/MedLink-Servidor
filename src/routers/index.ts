import { Router } from "express";
import authRouter from "../api/auth/routes";
import patientRouter from "../api/patient/routes";
import adminRouter from "../api/admin/routes";
import patientAllergieDataRouter from "../api/patientAllergieData/routes";
import patientFamilyInheritanceRouter from "../api/patientFamilyInheritance/routes";
import patientPathologicalDataRouter from "../api/patientPathologicalData/routes";
import patientNonPathologicalDataRouter from "../api/patientNonPathologicalData/routes";
import PatientVaccinationSheduleRouter from "../api/patientVaccinationShedule/routes";
import patientMedicationsRouter from "../api/patientMedications/routes";
import documentsRouter from "../api/documents/routes";
import doctorRouter from "../api/doctor/routes";
import contactRouter from "../api/contact/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/patient", patientRouter);
apiRouter.use("/doctor", doctorRouter);
apiRouter.use("/allergie", patientAllergieDataRouter);
apiRouter.use("/family-inheritance", patientFamilyInheritanceRouter);
apiRouter.use("/pathological-data", patientPathologicalDataRouter);
apiRouter.use("/non-pathological-data", patientNonPathologicalDataRouter);
apiRouter.use("/vaccination-shedule", PatientVaccinationSheduleRouter);
apiRouter.use("/medication", patientMedicationsRouter);
apiRouter.use("/document", documentsRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/contact", contactRouter);

export default apiRouter;
