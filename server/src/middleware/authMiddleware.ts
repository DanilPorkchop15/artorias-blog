import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: 'Not authorized'});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.body.userId = decoded._id;
    next();
  } catch (e) {
    res.status(401).json({message: 'Not authorized'});
  }
}