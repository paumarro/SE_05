import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController";
import {
  handleValidationError,
  validateUserLogin,
  validateUserRegistration,
} from "../middlewares/validations";

export const userRoute: Router = Router();

userRoute.post(
  "/login",
  validateUserLogin,
  handleValidationError,
  loginController
);

userRoute.post(
  "/register",
  validateUserRegistration,
  handleValidationError,
  registerController
);