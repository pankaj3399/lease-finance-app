import express from 'express';
const router = express.Router();

import handleValidation from '../../middleware/schemaValidation.js';

import { asyncHandler } from '../../lib/helpers.js';

import authValidations from './requests.js';
import authServices from './services.js';

const loginUserHandler = asyncHandler(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  res.status(200).json(result);
});

const refreshTokenHandler = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await authServices.getAccessToken(
    req.body
  );

  res.status(200).json({ accessToken, refreshToken });
});

router.post(
  '/login',
  handleValidation(authValidations.valideLoginUser),
  loginUserHandler
);
router.post('/refresh', refreshTokenHandler);

export default router;
