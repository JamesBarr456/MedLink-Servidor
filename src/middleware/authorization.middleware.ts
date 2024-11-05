import { Request, Response, NextFunction } from "express";
import { Roles } from "../constants/Roles";
import apiResponse from "../utils/apiResponse.utils";
import HTTP_STATUS from "../constants/HttpStatus";

const authorizeRoles = (roles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.role;

        if (roles.includes(userRole)) {
            next();
        } else {
            const response = apiResponse(false, {
                message: "You are not authorized to access this resource",
            });
            res.status(HTTP_STATUS.FORBIDDEN).json(response);
        }
    };
};

export default authorizeRoles;
