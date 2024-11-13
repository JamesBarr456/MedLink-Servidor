import { z } from "zod";

export const mongoIdValidator = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");
