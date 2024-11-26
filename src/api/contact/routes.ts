import { Router } from "express";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { contactFormValidator } from "./validator";
import ContactController from "./controller";

const contactRouter = Router();

contactRouter.post(
    "/",
    schemaValidator(contactFormValidator, null),
    ContactController.sendMail
);

export default contactRouter;
