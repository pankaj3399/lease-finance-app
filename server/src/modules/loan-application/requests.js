import joi from 'joi';

const validateCreateLoanApplication = (data) => {
  const applicationSchema = {
    firstName: joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    middleName: joi.string().optional().allow(''),
    lastName: joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
    phoneNumberType: joi.string().required().valid('home', 'cell').messages({
      'any.required': 'Phone number type is required',
      'any.required': 'Invalid phone number type',
    }),
    phoneNumber: joi.string().required().messages({
      'any.required': 'Phone number is required',
    }),
    email: joi.string().required().messages({
      'any.required': 'Email is required',
    }),
    currentAddress: joi
      .object()
      .required()
      .keys({
        isRuralRoute: joi.boolean().optional().allow('').default(false),
        ruralRoute: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        box: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        street: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().optional().allow('').default(''),
          otherwise: joi.string().required().messages({
            'any.required': 'Current street address is required',
          }),
        }),
        zipCode: joi.string().required().messages({
          'any.required': 'Current zip code is required',
        }),
        city: joi.string().required().messages({
          'any.required': 'Current city is required',
        }),
        state: joi.string().required().messages({
          'any.required': 'Current state is required',
        }),
        housingStatus: joi.string().required().messages({
          'any.required': 'Current housing status is required',
        }),
        monthsAtAddress: joi.number().required().messages({
          'any.required': 'Months at current address is required',
        }),
        yearsAtAddress: joi.number().optional().allow(''),
        mortage: joi.number().required().messages({
          'any.required': 'Mortage at current house is required',
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
        isRuralRoute: joi.boolean().optional().allow('').default(false),
        ruralRoute: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        box: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().required(),
          otherwise: joi.string().optional().allow(''),
        }),
        street: joi.when('isRuralRoute', {
          is: true,
          then: joi.string().optional().allow('').default(''),
          otherwise: joi.string().required().messages({
            'any.required': 'Current street address is required',
          }),
        }),
        zipCode: joi.string().required().messages({
          'any.required': 'Current zip code is required',
        }),
        city: joi.string().required().messages({
          'any.required': 'Current city is required',
        }),
        state: joi.string().required().messages({
          'any.required': 'Current state is required',
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
  });

  const result = createLoanApplicationSchema.validate(data);
  result.value = data;

  return result;
};

export default {
  validateCreateLoanApplication,
};
