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
    currentEmployement: {
      employementStatus: {
        type: String,
        required: true,
      },
      employeer: {
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
      incomeSource: {
        type: String,
        required: true,
      },
    },
    previousEmployement: {
      employementStatus: {
        type: String,
        required: true,
      },
      employeer: {
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
  },
  { timestamps: true }
);

const applicationModel = mongoose.model('application', applicationSchema);

export default applicationModel;
