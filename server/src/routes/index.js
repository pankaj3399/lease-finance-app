import express from 'express';
const router = express.Router();

import authRoutes from '../modules/auth/controllers.js';
import loanApplicationRoutes from '../modules/loan-application/controllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/loan-application', loanApplicationRoutes);

export default router;
