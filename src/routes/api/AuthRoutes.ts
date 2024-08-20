import { Router } from "express";
import {loginValidation, registerValidation} from "../../validations/AuthValidation";
import checkAuth from "../../middleware/authMiddleware";
import {getUser, login, register} from "../../controllers/AuthController";


const router: Router = Router();

router.post('/login', loginValidation, login);

router.post('/register', registerValidation, register);

router.get('/me', checkAuth, getUser);

export default router