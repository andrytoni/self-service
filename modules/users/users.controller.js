import { Router } from 'express';
import User from '../../models/user.js';
import UsersService from '../../mocks/users/users.service.js';

const usersController = Router();
const usersService = UsersService(User);

usersController.post('/', async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);

    return res.json(newUser);
  } catch (error) {
    return next(error);
  }
});

usersController.get('/:id', async (req, res, next) => {
  try {
    const user = await usersService.findById(req.params.id);

    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

usersController.get('/', async (req, res, next) => {
  try {
    const users = await usersService.find(req.query);

    return res.json(users);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);

    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/password/:id', async (req, res, next) => {
  try {
    const updatedUser = await usersService.changePassword(
      req.params.id,
      req.body
    );

    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/status/:id', async (req, res, next) => {
  try {
    const updatedUser = await usersService.changeUserStatus(req.params.id);

    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

export default usersController;
