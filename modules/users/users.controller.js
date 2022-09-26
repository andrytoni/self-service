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

usersController.get('/email/:email', async (req, res, next) => {
  try {
    const findByEmail = await usersService.findByEmail(req.params.email);

    return res.json(findByEmail);
  } catch (error) {
    return next(error);
  }
});

usersController.get('/:id', async (req, res, next) => {
  try {
    const findById = await usersService.findById(req.params.id);

    return res.json(findById);
  } catch (error) {
    return next(error);
  }
});

usersController.get('/', async (req, res, next) => {
  try {
    const findUsers = await usersService.find(req.query);

    return res.json(findUsers);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await usersService.updateUser(req.params.id, req.body);

    return res.json(updateUser);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/password/:id', async (req, res, next) => {
  try {
    const newUserPassword = await usersService.changePassword(
      req.params.id,
      req.body
    );

    return res.json(newUserPassword);
  } catch (error) {
    return next(error);
  }
});

usersController.put('/status/:id', async (req, res, next) => {
  try {
    const newUserStatus = await usersService.changeUserStatus(req.params.id);

    return res.json(newUserStatus);
  } catch (error) {
    return next(error);
  }
});
export default usersController;
