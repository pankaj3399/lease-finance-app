import Application from '../application/model.js';
import LoanApplication from './model.js';

const createLoanApplication = async (body, userId) => {
  const { firstApplication, secondApplication, applicationType } = body;

  if (applicationType === 'individual') {
    const applicationForm = await Application.create(firstApplication);
    const loanApplicationForm = await LoanApplication.create({
      applicationType,
      firstApplication: applicationForm._id,
      user: userId,
    });

    return loanApplicationForm;
  }

  const [firstApplicationForm, secondApplicationForm] = await Promise.all([
    Application.create(firstApplication),
    Application.create(secondApplication),
  ]);

  const joinLoanApplicationForm = await LoanApplication.create({
    applicationType,
    firstApplication: firstApplicationForm._id,
    secondApplication: secondApplicationForm._id,
    user: userId,
  });

  return joinLoanApplicationForm;
};

export default {
  createLoanApplication,
};
