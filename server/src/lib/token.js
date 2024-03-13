import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({});

const { JWT_SECRET } = process.env;

const expiryTime = {
  accessToken: '5d',
  refreshToken: '15d',
};

export const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiryTime.accessToken });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiryTime.refreshToken });
};

export const createToken = (payload, exp) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: exp });
};

export const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
