import User from '../user/model.js';

import { BadRequest } from '../../lib/errors.js';
import { createAccessToken, createRefreshToken } from '../../lib/token.js';

const loginUser = async (body) => {
  const { username, password } = body;

  const isUser = await User.findOne({ username });

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

const getAccessToken = async (data) => {
  const { refreshToken } = data;

  if (!refreshToken) throw new Unauthorized('User not logged in');

  const isUser = await User.findOne({ refreshToken });

  if (!isUser) {
    jwt.verify(refreshToken, JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new Forbidden('User access forbidden');
      }
      const hackedUser = await User.findById({ _id: decoded.userId });

      if (hackedUser) {
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    });

    throw new Forbidden('User access forbidden');
  }

  const newRefreshTokenArray = isUser?.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  let accessToken;
  let newRefreshToken;

  jwt.verify(refreshToken, JWT_SECRET, async (err, decoded) => {
    if (err) {
      isUser.refreshToken = [...newRefreshTokenArray];
      await isUser.save();
    }
    if (err || !isUser._id.equals(decoded.userid)) {
      throw new Forbidden('User access forbidden');
    }

    accessToken = createAccessToken({
      userId: isUser._id,
    });

    newRefreshToken = createRefreshToken({
      userId: isUser._id,
      role: isUser.role,
    });

    const refreshTokens = [...newRefreshTokenArray, newRefreshToken];

    await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: refreshTokens }
    );
  });

  return { accessToken, refreshToken: newRefreshToken };
};

export default {
  loginUser,
  getAccessToken,
};
