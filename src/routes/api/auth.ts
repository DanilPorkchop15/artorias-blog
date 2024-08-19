import { Router, Request, Response } from "express";
import {registerValidation} from "../../validations/auth";
import {validationResult} from "express-validator";
import User from "../../models/user";
import jwt, {Secret, JwtPayload} from 'jsonwebtoken';


const router = Router();

router.post('/auth/register', registerValidation, (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }

  const doc = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar || null
  });
});

export default router