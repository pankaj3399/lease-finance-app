import express from 'express';
const router = express.Router();

import handleValidation from '../../middleware/schemaValidation.js';

import { asyncHandler } from '../../lib/helpers.js';

import authValidations from './requests.js';
import authServices from './services.js';

const loginUserHandler = asyncHandler(async (req, res) => {
  console.log('called');
  const result = await authServices.loginUser(req.body);

  res.status(200).json({
    user: result,
  });
});

router.post(
  '/login',
  handleValidation(authValidations.valideLoginUser),
  loginUserHandler
);

export default router;
