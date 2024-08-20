import {body, ValidationChain} from 'express-validator'

export const registerValidation: ValidationChain[] = [
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('password').isLength({min: 6}).notEmpty().withMessage('Password is required and must be at least 6 characters long'),
  body('fullName').isLength({min: 3}).notEmpty().withMessage('Full name is required and must be at least 3 characters long'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
]

export const loginValidation: ValidationChain[] = [
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('password').isLength({min: 6}).notEmpty().withMessage('Password is required and must be at least 6 characters long')
]