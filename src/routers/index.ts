// LIBRARIES
import { Router } from "express";
import authRouter from "../api/auth/routes";
// Routes

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
