// LIBRARIES
import { Response, Request, NextFunction } from "express";
import { AnyZodObject, ZodTypeAny, ZodError } from "zod";
// CONSTANTS
import HTTP_STATUS from "../constants/HttpStatus";

const schemaValidator = (
    schema: AnyZodObject | null,
    paramsSchema: ZodTypeAny | null
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (schema) {
                schema.parse(req.body);
            }

            if (paramsSchema) {
                paramsSchema.parse(req.params.id);
                if (req.params.productId) {
                    paramsSchema.parse(req.params.productId);
                }
            }
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(
                    error.issues.map((issue) => ({
                        path: issue.path[0],
                        message: issue.message,
                    }))
                );
                return;
            }
            res.status(HTTP_STATUS.SERVER_ERROR).json({
                message: "Internal server error",
            });
            return;
        }
    };
};

export default schemaValidator;
