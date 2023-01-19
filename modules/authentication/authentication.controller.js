import { Router } from 'express';
import User from '../../models/user.js';
import AuthenticationService from './authentication.service.js';

const authenticationController = Router();
const authenticationService = AuthenticationService(User);

authenticationController.post('/', async (req, res, next) => {
  try {
    const userToken = await authenticationService.loginUser(
      req.body.email,
      req.body.password
    );

    return res.json(userToken);
  } catch (err) {
    return next(err);
  }
});

export default authenticationController;
