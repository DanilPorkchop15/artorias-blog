import { Router } from "express";
import {loginValidation, registerValidation} from "../../validations/AuthValidation";
import checkAuth from "../../middleware/authMiddleware";
import {getUser, login, register} from "../../controllers/AuthController";
import {handleValidationErrorsMiddleware} from "../../middleware/handleValidationErrorsMiddleware";


const router: Router = Router();

router.post(
  '/login',
  loginValidation,
  handleValidationErrorsMiddleware,
  login
);

router.post(
  '/register',
  registerValidation,
  handleValidationErrorsMiddleware,
  register
);

router.get('/me', checkAuth, getUser);

export default router