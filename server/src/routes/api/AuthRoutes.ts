import { Router } from "express";
import {loginValidation, registerValidation} from "../../validations/AuthValidation";
import checkAuth from "../../middleware/authMiddleware";
import {AuthController} from "../../controllers";
import {handleValidationErrorsMiddleware} from "../../middleware/handleValidationErrorsMiddleware";


const router: Router = Router();

router.post(
  '/login',
  loginValidation,
  handleValidationErrorsMiddleware,
  AuthController.login
);

router.post(
  '/register',
  registerValidation,
  handleValidationErrorsMiddleware,
  AuthController.register
);

router.get('/me', checkAuth, AuthController.getUser);

export default router