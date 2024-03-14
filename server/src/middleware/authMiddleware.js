import * as dotenv from 'dotenv';
dotenv.config({});

import jwt from 'jsonwebtoken';

import { Unauthorized } from '../lib/errors.js';

const authMiddleware = (req, res, next) => {
  let Token = req.headers['authorization'];

  if (!Token) {
    throw new Unauthorized('User not logged in');
  }

  Token = Token?.split(' ')[1];

  jwt.verify(Token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      throw new Unauthorized('Access Denied');
    } else {
      req.userid = decoded.userId;
      next();
    }
  });
};

export default authMiddleware;
