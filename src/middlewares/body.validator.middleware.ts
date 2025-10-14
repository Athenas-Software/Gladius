import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";

export const validateBody =
    (schema: ZodObject<ZodRawShape>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.body);
                req.body = parsed; // Replace with validated data
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    // Map issues to a clean format
                    const formattedErrors = error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    }));

                    return res.status(400).json({
                        message: "Validation failed",
                        errors: formattedErrors,
                    });
                }

                next(error);
            }
        };
