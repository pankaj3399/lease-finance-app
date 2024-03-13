import User from '../user/model.js';

import { BadRequest } from '../../lib/errors.js';
import { createAccessToken, createRefreshToken } from '../../lib/token.js';

const loginUser = async (body) => {
  const { email, password } = body;

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new BadRequest('Wrong credentials');
  }

  const isPassword = await isUser.authenticate(password);

  if (!isPassword) {
    throw new BadRequest('Wrong credentials');
  }

  const accessToken = createAccessToken({
    userId: isUser._id,
  });

  const refreshToken = createRefreshToken({
    userId: isUser._id,
  });

  isUser.refreshToken = refreshToken;

  await isUser.save();

  isUser.password = undefined;
  isUser.refreshToken = undefined;

  return {
    user: isUser,
    accessToken,
    refreshToken,
  };
};

export default {
  loginUser,
};
