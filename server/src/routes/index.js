import express from 'express';
const router = express.Router();

import authRoutes from '../modules/auth/controllers.js';
import loanApplicationRoutes from '../modules/loan-application/controllers.js';

router.use('/auth', authRoutes);
router.use('/loan-application', loanApplicationRoutes);

export default router;
