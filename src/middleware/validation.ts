import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must me string"),
  body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be string"),
  body("city").isString().notEmpty().withMessage("city must be string"),
  body("moobileNo").isString().notEmpty().withMessage("MobileNo must be String"),
  body("country").isString().notEmpty().withMessage("country must be string"),
  handleValidationErrors,
];

