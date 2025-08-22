import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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





export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("city")
    .notEmpty()
    .withMessage("City is required"),

  body("country")
    .notEmpty()
    .withMessage("Country is required"),

  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),

  body("estimatedDeliveryTime")
    .isInt({ min: 1 }) // align with frontend
    .withMessage("Estimated delivery time must be a positive integer"),

  // cuisines must be array with at least 1 element
  body("cuisines")
    .isArray({ min: 1 })
    .withMessage("Please select at least one cuisine"),
  body("cuisines.*")
    .notEmpty()
    .withMessage("Each cuisine is required"),

  // menuItems must be array with at least 1 element
  body("menuItems")
    .isArray({ min: 1 })
    .withMessage("At least one menu item is required"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 1 })
    .withMessage("Menu item price is required and must be a positive number"),

  handleValidationErrors,
];
