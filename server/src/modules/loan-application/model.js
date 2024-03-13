import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema(
  {
    applicationType: {
      type: String,
      required: true,
      enum: ['individual', 'joint'],
    },
    firstApplication: {
      firstName: {
        Type: String,
        required: true,
      },
      middleName: {
        Type: String,
        default: '',
      },
      lastName: {
        type: String,
        required: true,
      },
      suffix: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      phoneNumberType: {
        type: String,
        enum: ['home', 'cell'],
        default: 'home',
      },
      email: {
        type: String,
        required: true,
      },
      salesPersonFirstName: {
        type: String,
      },
      salesPersonLastName: {
        type: String,
      },
      currentAddress: {
        isRuralRoute: {
          type: Boolean,
          default: false,
        },
        ruralRoute: {
          type: String,
        },
        box: {
          type: String,
        },
        street: String,
        apartment: String,
        zipCode: {
          type: String,
          required: true,
        },
        city: { type: String, required: true },
        state: { type: String, required: true },
      },
      housingStatus: {
        type: String,
        required: true,
      },
      yearsAtAddress: {
        type: Number,
        default: 0,
      },
      monthsAtAddress: {
        type: Number,
        default: 0,
      },
      mortage: {
        type: Number,
        default: 0,
      },
      dob: String,
      SSN: String,
      previousAddress: {
        isRuralRoute: {
          type: Boolean,
          default: false,
        },
        ruralRoute: {
          type: String,
        },
        box: {
          type: String,
        },
        street: String,
        apartment: String,
        zipCode: {
          type: String,
          required: true,
        },
        city: { type: String, required: true },
        state: { type: String, required: true },
      },
      employementStatus: {
        type: String,
        required: true,
      },
      employeer: {
        type: String,
        required: true,
      },

      workTitle: {
        Type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const loanApplicationModel = mongoose.model(
  'loanApplication',
  loanApplicationSchema
);

export default loanApplicationModel;
