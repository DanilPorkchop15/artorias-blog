import {body, ValidationChain} from "express-validator";

export const postCreateValidation: ValidationChain[] = [
  body('title').isLength({min: 3}).withMessage('Title should be at least 3 characters'),
  body('text').isLength({min: 10}).withMessage('Text should be at least 10 characters'),
  body('tags').optional().isString().withMessage('Tags should be a string'),
  body('imageUrl').optional().isString().withMessage('Image url should be a string')
]