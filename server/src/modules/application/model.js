import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
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
      enum: ['Home', 'Cell'],
      default: 'Home',
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
    dob: String,
    SSN: String,
    currentAddress: {
      isSameAsApplicant: {
        type: Boolean,
        default: false,
      },
      isSameMortageInformationAsApplicant: {
        type: Boolean,
        default: false,
      },
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
      streetNumber: String,
      streetAddress: String,
      streetType: String,
      apartment: String,
      zipCode: {
        type: String,
      },
      city: String,
      state: String,
      housingStatus: String,
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
    },

    previousAddress: {
      isSameAsApplicant: {
        type: Boolean,
        default: false,
      },
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
      streetNumber: String,
      streetAddress: String,
      streetType: String,
      apartment: String,
      zipCode: String,
      city: String,
      state: String,
    },
    currentEmployement: {
      employementStatus: {
        type: String,
        required: true,
      },
      employer: {
        type: String,
        required: true,
      },
      workTitle: {
        type: String,
        required: true,
      },
      workPhone: {
        type: String,
        required: true,
      },
      yearsAtJob: Number,
      monthsAtJob: {
        type: Number,
        required: true,
      },
    },
    previousEmployement: {
      employementStatus: String,
      employer: String,
      workTitle: String,
      workPhone: String,
      yearsAtJob: Number,
      monthsAtJob: Number,
    },
    incomeSources: [
      {
        incomeSource: {
          type: String,
          required: true,
        },
        annualIncome: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const applicationModel = mongoose.model('application', applicationSchema);

export default applicationModel;
