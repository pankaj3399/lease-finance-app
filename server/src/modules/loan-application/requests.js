import joi from 'joi';

const validateCreateLoanApplication = (data) => {
  const applicationSchema = {
    firstName: joi.string().required().messages({
      'any.required': 'First name is required',
    }),

    suffix: joi.string().optional().allow(''),

    middleName: joi.string().optional().allow(''),
    lastName: joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
    phoneNumberType: joi.string().required().valid('Home', 'Cell').messages({
      'any.required': 'Phone number type is required',
      'any.required': 'Invalid phone number type',
    }),
    phoneNumber: joi.string().required().messages({
      'any.required': 'Phone number is required',
    }),
    email: joi.string().required().messages({
      'any.required': 'Email is required',
    }),
    verifyEmail: joi.string().required().messages({
      'any.required': 'Verify your email address',
    }),
    currentAddress: joi
      .object()
      .required()
      .keys({
        isSameAsApplicant: joi.boolean().optional().allow(''),
        isSameMortageInformationAsApplicant: joi.boolean().optional().allow(''),
        isRuralRoute: joi.boolean().optional().allow('').default(false),
        ruralRoute: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().required(),
            otherwise: joi.string().optional().allow(''),
          }),
          otherwise: joi.string().optional().allow('').default(false),
        }),
        box: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        streetNumber: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().optional().allow('').default(''),
            otherwise: joi.string().required().messages({
              'any.required': 'Current street address is required',
            }),
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        streetAddress: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().optional().allow('').default(''),
            otherwise: joi.string().required().messages({
              'any.required': 'Current street address is required',
            }),
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        streetType: joi.string().optional().allow('').default(''),
        zipCode: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Current zip code is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        city: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Current city is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        state: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Current state is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        housingStatus: joi.when('isSameMortageInformationAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Current housing status is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        monthsAtAddress: joi.when('isSameMortageInformationAsApplicant', {
          is: false,
          then: joi.number().required().messages({
            'any.required': 'Months at current address is required',
          }),
          otherwise: joi.number().optional().allow('').default(''),
        }),
        yearsAtAddress: joi.number().optional().allow(''),
        mortage: joi.when('isSameMortageInformationAsApplicant', {
          is: false,
          then: joi.when('housingStatus', {
            is: 'Own Outright',
            then: joi.number().optional().allow('').default(''),
            otherwise: joi.number().required().messages({
              'any.required': 'Mortage at current house is required',
            }),
          }),
          otherwise: joi.number().optional().allow('').default(''),
        }),
      })
      .messages({
        'any.required': 'Current address details are required',
      }),
    dob: joi.date().required().messages({
      'any.required': 'Date of birth is required',
    }),
    SSN: joi.string().required().messages({
      'any.required': 'SSN is required',
    }),
    previousAddress: joi
      .object()
      .required()
      .keys({
        isSameAsApplicant: joi.boolean().optional().allow(''),
        isSameMortageInformationAsApplicant: joi.boolean().optional().allow(''),
        isRuralRoute: joi.boolean().optional().allow('').default(false),
        ruralRoute: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().required(),
            otherwise: joi.string().optional().allow(''),
          }),
          otherwise: joi.string().optional().allow('').default(false),
        }),
        box: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        streetNumber: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().optional().allow('').default(''),
            otherwise: joi.string().required().messages({
              'any.required': 'Previous street address is required',
            }),
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        streetAddress: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.when('isRuralRoute', {
            is: true,
            then: joi.string().optional().allow('').default(''),
            otherwise: joi.string().required().messages({
              'any.required': 'Previous street address is required',
            }),
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        streetType: joi.string().optional().allow('').default(''),
        zipCode: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Previous address zip code is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        city: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Previous address city is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
        state: joi.when('isSameAsApplicant', {
          is: false,
          then: joi.string().required().messages({
            'any.required': 'Previous address state is required',
          }),
          otherwise: joi.string().optional().allow('').default(''),
        }),
      })
      .messages({
        'any.required': 'Previous address details are required',
      }),
    currentEmployement: joi
      .object()
      .required()
      .keys({
        employementStatus: joi.string().required().messages({
          'any.required': 'Current employement status is required',
        }),
        employer: joi.string().required().messages({
          'any.required': 'Current employer name is required',
        }),
        workTitle: joi.string().required().messages({
          'any.required': 'Current work title is required',
        }),
        workPhone: joi.string().required().messages({
          'any.required': 'Current work phone number is required',
        }),
        monthsAtJob: joi.number().required().messages({
          'any.required': 'Months at current job is required',
        }),
        yearsAtJob: joi.number().optional().allow().default(0),
        incomeSource: joi.string().required().messages({
          'any.required': 'Current income source is required',
        }),
        annualIncome: joi.number().required().messages({
          'any.required': 'Current annual income is required',
        }),
      })
      .messages({
        'any.required': 'Current employement details are required',
      }),
    previousEmployement: joi
      .object()
      .required()
      .keys({
        employementStatus: joi.string().required().messages({
          'any.required': 'Current employement status is required',
        }),
        employer: joi.string().required().messages({
          'any.required': 'Current employer name is required',
        }),
        workTitle: joi.string().required().messages({
          'any.required': 'Current work title is required',
        }),
        workPhone: joi.string().required().messages({
          'any.required': 'Current work phone number is required',
        }),
        monthsAtJob: joi.number().required().messages({
          'any.required': 'Months at current job is required',
        }),
        yearsAtJob: joi.number().optional().allow().default(0),
      })
      .messages({
        'any.required': 'Current employement details are required',
      }),
  };

  const createLoanApplicationSchema = joi.object().keys({
    applicationType: joi
      .string()
      .required()
      .valid('individual', 'joint')
      .messages({
        'any.required': 'Application type is required',
        'any.only': 'Invalid application type',
      }),
    firstApplication: joi.object().required().keys(applicationSchema).messages({
      'any.required': 'First application is required',
    }),
    secondApplication: joi.when('applicationType', {
      is: 'joint',
      then: joi.object().required().keys(applicationSchema).messages({
        'any.required': 'Second application is required',
      }),
      otherwise: joi.object().optional().allow(''),
    }),
    agreePrivacyNotice: joi.boolean().required().valid(true).messages({
      'any.only': 'You must agree to Privacy Notice',
    }),
    agreeTermsAndConditions: joi.boolean().required().valid(true).messages({
      'any.only': 'You must agree to Terms and Conditions',
    }),
    salesPersonFirstName: joi.string().optional().allow(''),
    salesPersonLastName: joi.string().optional().allow(''),
    relationWithCoApplicant: joi.when('applicationType', {
      is: 'joint',
      then: joi.string().required().messages({
        'any.required': 'Relation with co-applicant is required',
      }),
      otherwise: joi.string().optional().allow(''),
    }),
  });

  const result = createLoanApplicationSchema.validate(data);
  result.value = data;

  return result;
};

export default {
  validateCreateLoanApplication,
};
