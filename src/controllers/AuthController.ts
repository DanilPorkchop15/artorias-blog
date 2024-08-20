import {Request, Response} from "express";
import User from "../models/User";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res
        .status(404)
        .json({
          message: 'User not found'
        });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPass) {
      return res
        .status(404)
        .json({
          message: 'Invalid password'
        });
    }
    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET as Secret, {
      expiresIn: '7d'
    });
    const {password, ...userData} = user._doc;
    res.json({
      ...userData,
      token
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'Login error'
    });
  }
}

export const register = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()});
  }
  const password: string = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const doc = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hash,
    avatar: req.body.avatar || null
  });

  try {
    const user = await doc.save();
    if (user._doc) {
      const {password, ...userData} = user._doc;
      const token = jwt.sign({
        _id: user._id
      }, process.env.JWT_SECRET as Secret, {
        expiresIn: '7d'
      });
      res.json({
        ...userData,
        token
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'Registration error'
    });
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res
        .status(404)
        .json({
          message: 'User not found'
        });
    }
    const {password, ...userData} = user._doc;
    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'Get user error'
    });
  }
}