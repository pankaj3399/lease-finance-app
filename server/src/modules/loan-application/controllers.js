import express from 'express';
const router = express.Router();

import { asyncHandler } from '../../lib/helpers.js';
import handleValidation from '../../middleware/schemaValidation.js';

import loanApplicationServices from './services.js';
import loanApplicationValidatiors from './requests.js';

const createLoanApplicationHandler = asyncHandler(async (req, res) => {
  const loanApplication = await loanApplicationServices.createLoanApplication(
    req.body,
    req.userid
  );

  res.status(201).json({
    loanApplication,
    message: 'Loan application created successfully',
  });
});

router.post(
  '/',
  handleValidation(loanApplicationValidatiors.validateCreateLoanApplication),
  createLoanApplicationHandler
);

export default router;
