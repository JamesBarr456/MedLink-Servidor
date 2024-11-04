import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HTTP_STATUS from "../constants/HttpStatus";
import HttpError from "../utils/HttpError.utils";
import apiResponse from "../utils/apiResponse.utils";
import config from "../config/enviroment.config";
import UserService from "../api/user/service";

export default async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.substring(7);
    console.log("🚀 ~ token:", token);

    if (!token) {
        const response = apiResponse(
            false,
            new HttpError(
                "Token is required",
                "TOKEN_REQUIRED",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        return;
    }

    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);

        const tokenData = JSON.stringify(decodedToken);

        const user = await UserService.getUserById(JSON.parse(tokenData).id);

        if (!user) {
            const response = apiResponse(
                false,
                new HttpError(
                    "User not found",
                    "USER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                )
            );
            res.status(HTTP_STATUS.NOT_FOUND).json(response);
            return;
        }
        req.body.user = user;
        next();
    } catch (error) {
        const response = apiResponse(
            false,
            new HttpError(
                "Invalid token",
                "INVALID_TOKEN",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        return;
    }
}
