import joi from 'joi';

const valideLoginUser = (data) => {
  const loginUserSchema = joi.object().keys({
    username: joi.string().required().messages({
      'any.required': 'Username is required',
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
