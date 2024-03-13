import joi from 'joi';

const valideLoginUser = (data) => {
  const loginUserSchema = joi.object().keys({
    email: joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email is invalid',
    }),
    password: joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  });

  const result = loginUserSchema.validate(data);
  result.value = data;

  return result;
};

export default {
  valideLoginUser,
};
