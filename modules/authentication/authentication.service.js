// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import UsersService from '../users/users.service.js';
import User from '../../models/user.js';

const usersService = UsersService(User);

const AuthenticationService = (User) => {
  const loginUser = async (email, password) => {
    const userEmail = email.toLowerCase();
    const user = await User.findOne({ email: userEmail });

    if (!user) return { message: 'Unregistered user.' };

    const loginPassword = await usersService.encryptPassword(
      user._id,
      password,
      'comparison'
    );

    if (loginPassword != user.password)
      return { message: 'Password not correct!' };

    const userNewToken = new mongoose.Types.ObjectId();
    await User.findOneAndUpdate(
      { email: userEmail },
      { token: userNewToken, tokenGeneration: new Date() }
    );

    return { message: 'Login successful!', token: userNewToken };
  };

  const authenticateReq = async (req, res, next) => {
    try {
      const browserToken = req.headers.authorization;
      const user = await validateToken(browserToken);

      if (!user) {
        return res.status(401).json({
          message:
            'Sorry, you do not have authorization. Please, try to login.',
        });
      }

      req.user = user;

      return next();
    } catch (error) {
      return next(error);
    }
  };

  const validateToken = async (tokenId) => {
    const user = await usersService.findUserToken(tokenId);
    const twoHours = 7200000;

    if (!user) return false;
    if (
      Math.abs(new Date() - user.tokenGeneration) > twoHours ||
      !user.tokenGeneration
    )
      return false;

    return user;
  };

  const validatePermission = async (req, res, next) => {
    const user = req.user;

    if (!req.permissions?.[req.baseUrl]?.[req.method]?.includes(user.role)) {
      return res
        .status(403)
        .json({ message: 'You do not have the permission to access.' });
    }

    return next();
  };

  return {
    loginUser,
    authenticateReq,
    validatePermission,
  };
};

export default AuthenticationService;
