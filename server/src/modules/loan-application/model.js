import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema(
  {
    applicationType: {
      type: String,
      required: true,
      enum: ['individual', 'joint'],
    },
    firstApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'application',
      required: true,
    },
    secondApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'application',
    },
    relationWithCoApplicant: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    salesPersonFirstName: String,
    salesPersonLastName: String,
  },
  { timestamps: true }
);

const loanApplicationModel = mongoose.model(
  'loanApplication',
  loanApplicationSchema
);

export default loanApplicationModel;
